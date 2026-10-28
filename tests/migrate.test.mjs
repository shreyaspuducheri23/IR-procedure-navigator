import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { captureLegacyState, convertProcedure } from '../scripts/migrate.mjs';
import { articleSchema } from '../src/schema/article.ts';
const report = () => ({ problems: [], orphans: [], rewrittenLinks: {}, internalLinks: 0, externalLinks: 0 });
const convert = (p) => convertProcedure(p, [], report());
test('access care sits immediately below routine orders', () => {
  for (const procedure of captureLegacyState().procedures) {
    const sections = Object.values(procedure.nodes).find(node => node.title === 'Post-procedure')?.checklistSections;
    if (!Array.isArray(sections)) continue;
    const access = sections.findIndex(section => section.title === 'Access care');
    if (access < 0) continue;
    const routine = sections.findIndex(section => /^Routine orders|^Before lab results/i.test(section.title));
    assert.equal(access, routine + 1, procedure.id);
    for (const section of sections.filter(section => /^Routine orders|^Before lab results/i.test(section.title))) {
      assert.doesNotMatch(JSON.stringify(section.items), /Monitor (?:color of )?access.site|Flush with|suture device|Femoral venous access:/i, procedure.id);
    }
  }
});
test('finalized nursing orders preserve source schedules and conditional recovery', () => {
  const all = captureLegacyState().procedures;
  const get = id => all.find(p => p.id === id);
  const node = (id, title) => Object.values(get(id).nodes).find(n => n.title === title);
  const routine = id => node(id, 'Post-procedure').checklistSections.find(s => s.title === 'Routine orders');
  for (const id of ['arteriogram', 'hemorrhoid-artery-embolization', 'prostate-artery-embolization', 'y90-radioembolization-mapping', 'y90-radioembolization-therapy']) {
    assert.match(JSON.stringify(node(id, 'Pre-procedure orders')), /Pulse checks/);
    assert.match(JSON.stringify(node(id, 'Pre-procedure orders')), /not left arm/);
    const vitals = routine(id).items.filter(item => /Vital signs/.test(JSON.stringify(item)));
    assert.equal(vitals.length, 1, id);
    assert.match(vitals[0], /15 minutes x 4.*30 minutes x 2.*1 hour x 4.*4 hours/);
  }
  assert.match(JSON.stringify(node('y90-radioembolization-mapping', 'Post-procedure').checklistSections.find(s => s.title === 'Access care')), /Monitor color of access site/);
  assert.match(JSON.stringify(node('inferior-vena-cava-filter-removal', 'Post-procedure')), /HOB >45/);
  const thora = JSON.stringify(routine('thoracentesis'));
  assert.match(thora, /CXR STAT if ordered by MD/);
  assert.match(thora, /if no CXR is ordered/);
  assert.match(JSON.stringify(node('celiac-plexus-block-neurolysis', 'Pre-procedure orders')), /CBC and INR within 30 days/);
  assert.match(JSON.stringify(node('port-placement', 'Pre-procedure orders')), /If on active chemotherapy: CBC with differential/);
  assert.match(JSON.stringify(node('port-placement', 'Pre-procedure orders')), /If on warfarin: INR within 30 days/);
  assert.doesNotMatch(JSON.stringify(node('port-placement', 'Pre-procedure orders')), /not left arm/);
  const gTube = node('gastrostomy-gastrojejunostomy-jejunostomy-tube-placement', 'Post-procedure');
  assert.match(JSON.stringify(gTube), /No diet until cleared by IR/);
  assert.match(JSON.stringify(gTube), /primary team feeds are okay/);
});
test('arteriogram embolization is complete with standard tabs and arterial recovery', () => {
  const p = captureLegacyState().procedures.find(p => p.id === 'arteriogram');
  const article = convert(p);
  assert.equal(article.status, 'complete');
  assert.equal(article.title, 'Arteriogram with Possible Embolization');
  assert.equal(article.bleedRisk, 'high');
  assert.deepEqual(article.sections.find(s => s.kind === 'pre').subsections.map(s => s.title),
    ['Indication', 'Anticoagulation', 'Labs', 'Pre-procedure orders', 'Sedation', 'Checklist', 'Consent']);
  const find = title => Object.values(p.nodes).find(n => n.title === title);
  assert.equal(find('Procedural steps').details['Basic steps'].length, 8);
  assert.match(JSON.stringify(find('Anatomy')), /Celiac trunk.*SMA.*IMA/);
  assert.match(JSON.stringify(find('Consent')), /dissection.*Nontarget.*bowel ischemia/);
  const post = article.sections.find(s => s.kind === 'post');
  const accessHeading = post.blocks.findIndex(b => b.type === 'heading' && b.text === 'Access care');
  assert.ok(accessHeading >= 0);
  assert.ok(post.blocks[accessHeading + 1].subitems);
  assert.match(JSON.stringify(post), /2-6 hours.*IRAVSARTERIOGRAM.*PPD1/);
  assert.equal(post.blocks.at(-1).title, 'Follow up');
  assert.ok(articleSchema.safeParse(article).success);
});
test('low-risk labs use conditional warfarin INR guidance and preserve potassium thresholds', () => {
  const low = captureLegacyState().procedures.filter(p => p.bleedRisk === 'Low');
  assert.ok(low.length > 0);
  for (const p of low) {
    const labs = Object.values(p.nodes).find(n => n.title === 'Labs');
    if (p.id === 'port-placement') {
      assert.deepEqual(labs.details.Labs, ['No routine labs unless on active chemotherapy or warfarin.', 'If on warfarin: INR < 3.']);
      continue;
    }
    assert.deepEqual(labs.details.Labs.slice(0, 2), [
      'No labs are routinely ordered. No CBC is indicated.',
      'If the patient is on warfarin, order an INR. INR must be < 3.',
    ], p.id);
    assert.doesNotMatch(JSON.stringify(labs), /Platelets|INR < 2-3/);
    if (['fistulogram', 'tunneled-line-placement-exchange'].includes(p.id)) {
      assert.ok(labs.details.Labs.includes('Potassium < 6 mmol/L.'));
    }
  }
});
test('procedural sequences are numbered without numbering supporting reference bullets', () => {
  const all = captureLegacyState().procedures;
  for (const p of all) {
    const node = Object.values(p.nodes).find(n => n.title === 'Procedural steps');
    if (!node?.details) continue;
    const [title, items] = Object.entries(node.details)[0];
    if (title === 'Needs procedure-specific edit') continue;
    items.forEach((item, i) => assert.match(typeof item === 'string' ? item : item.strong || item.text, new RegExp(`^${i + 1}\\. `), p.id));
  }
  const avs = Object.values(all.find(p => p.id === 'adrenal-vein-sampling').nodes).find(n => n.title === 'Procedural steps');
  assert.equal(avs.details['Sampling indices'][0].strong, 'Selectivity index (SI):');
});
test('arterial access care preserves available routes and nests radial instructions', () => {
  const all = captureLegacyState().procedures;
  const access = id => Object.values(all.find(p => p.id === id).nodes).find(n => n.title === 'Post-procedure').checklistSections.find(s => s.title === 'Access care');
  const femoralOnly = access('genicular-artery-embolization');
  assert.equal(femoralOnly.items.filter(item => item.strong === 'Femoral access:').length, 1);
  assert.equal(femoralOnly.items[0].text, ' Bedrest 2 hours with closure device; 6 hours with manual compression.');
  const both = access('hemorrhoid-artery-embolization');
  assert.deepEqual(both.items[1].subitems, ['Remove radial artery compression device within 2 hours post procedure.', 'Activity per JH-HLM mobility goal.']);
  const article = convert(all.find(p => p.id === 'hemorrhoid-artery-embolization'));
  assert.ok(articleSchema.safeParse(article).success);
  assert.match(JSON.stringify(article), /"subitems":/);
  assert.match(JSON.stringify(access('dvt-thrombectomy')), /Bedrest 2 hours with leg flat/);
  assert.doesNotMatch(JSON.stringify(access('transjugular-intrahepatic-portosystemic-shunt-creation-tips')), /manual compression|Radial/);
});
test('high-risk postprocedure restart lists use consistent medication timing', () => {
  const expected = [
    'Warfarin: 24 hours.',
    'IV unfractionated heparin: 6-8 hours.',
    'Enoxaparin: 12 hours.',
    'DOACs: Typically 24 hours; confirm agent and renal function.',
    'Clopidogrel: 75 mg dose - 6 hours; 300-600 mg loading dose - 24 hours.',
    'Aspirin: 24 hours.',
    'Restart after hemostasis is confirmed; individualize timing for procedure-specific or patient-specific exceptions.',
  ];
  let count = 0;
  for (const p of captureLegacyState().procedures.filter(p => p.bleedRisk === 'High')) {
    for (const node of Object.values(p.nodes).filter(n => n.title === 'Post-procedure')) {
      for (const section of node.checklistSections || []) {
        if (section.title !== 'Anticoagulation to resume') continue;
        assert.deepEqual(section.items, expected, p.id);
        count++;
      }
    }
  }
  assert.ok(count > 10);
});
test('hypogastric block uses deep-block precautions and UFE recovery without separate discharge', () => {
  const p = captureLegacyState().procedures.find(p => p.id === 'superior-hypogastric-nerve-block');
  const find = title => Object.values(p.nodes).find(n => n.title === title);
  assert.deepEqual(convert(p).sections.map(section => section.kind), ['pre', 'intra', 'post']);
  assert.match(JSON.stringify(find('Anticoagulation')), /Deep-plexus guidance overrides generic IR holds/);
  assert.match(JSON.stringify(p.nodes), /bupivacaine 0.25%, 20 mL \(50 mg\)/);
  assert.equal(find('Procedural steps').details['Basic steps'].length, 5);
  assert.match(JSON.stringify(find('Procedural steps')), /extravascular prevertebral spread/);
  assert.ok(!find('Post-procedure').checklistSections.some(section => /Discharge/.test(section.title)));
  assert.match(JSON.stringify(find('Post-procedure')), /UFE follow-up/);
});
test('PE thrombectomy has separate right-heart steps, monitoring, and attributed severity chart', () => {
  const p = captureLegacyState().procedures.find(p => p.id === 'pe-thrombectomy');
  const find = title => Object.values(p.nodes).find(n => n.title === title);
  assert.deepEqual(convert(p).sections.map(section => section.kind), ['pre', 'intra', 'post']);
  assert.match(JSON.stringify(find('Contraindications')), /intracranial hemorrhage/);
  assert.match(JSON.stringify(find('Procedural steps')), /tricuspid valve.*RV outflow tract.*pulmonic valve/);
  assert.match(JSON.stringify(find('Post-procedure')), /Continuous telemetry/);
  assert.equal(find('Indication').images[0].src, 'images/aha-acc-pe-clinical-categories.png');
  assert.match(find('Indication').images[0].caption, /Copyright 2026/);
});
test('DVT thrombectomy has anticoagulation safeguards and device-neutral steps', () => {
  const p = captureLegacyState().procedures.find(p => p.id === 'dvt-thrombectomy');
  const find = title => Object.values(p.nodes).find(n => n.title === title);
  assert.equal(convert(p).status, 'complete');
  assert.deepEqual(convert(p).sections.map(section => section.kind), ['pre', 'intra', 'post']);
  assert.match(JSON.stringify(find('Contraindications')), /Inability to tolerate therapeutic anticoagulation/);
  assert.match(JSON.stringify(find('Checklist')), /Review anticoagulation.*confirm tolerance/);
  const orders = JSON.stringify(find('Pre-procedure orders'));
  for (const pattern of [/80 units\/kg/, /18 units\/kg\/hour/, /6 hours/, /HIT/, /do not automatically re-bolus/]) assert.match(orders, pattern);
  assert.equal(find('Procedural steps').details['Basic steps'].length, 6);
  assert.match(JSON.stringify(find('Procedural steps')), /Penumbra or Inari/);
  assert.match(JSON.stringify(find('Post-procedure')), /Bedrest 2 hours with leg flat/);
  assert.equal(find('Post-procedure').checklistSections.at(-1).title, 'Follow up');
});
test('fistulogram potassium threshold, orders, and discharge are separated', () => {
  const p = captureLegacyState().procedures.find(p => p.title === 'Fistulogram');
  const find = title => Object.values(p.nodes).find(n => n.title === title);
  assert.ok(find('Labs').details.Labs.includes('Potassium < 6 mmol/L.'));
  const orders = find('Pre-procedure orders').details['Routine orders'];
  assert.ok(orders.includes('Potassium.'));
  assert.ok(orders.includes('Venous blood gas (VBG).'));
  assert.deepEqual(find('Post-procedure').checklistSections.find(s => s.title === 'Discharge - if outpatient').items,
    ['Discharge order with medication reconciliation - 30 minutes.', 'After visit summary: .IRAVSFISTULOGRAM.']);
});
test('drainage catheter lab orders and outpatient discharge are updated', () => {
  const p = captureLegacyState().procedures.find(p => p.title === 'Drainage Catheter Placement/Exchange');
  const find = title => Object.values(p.nodes).find(n => n.title === title);
  assert.ok(find('Pre-procedure orders').details['Routine orders'].includes('INR and CBC within 30 days.'));
  const sections = find('Post-procedure').checklistSections;
  assert.deepEqual(sections.find(s => s.title === 'Discharge - if outpatient').items, [
    'Discharge order with medication reconciliation - 30 minutes.',
    'After visit summary: .IRAVSPERCDRAINAGE1.',
  ]);
  assert.equal(sections.at(-1).title, 'Follow up');
  assert.deepEqual(sections.at(-1).items, ['CT and drain check in 2 weeks.']);
});
test('biliary orders distinguish placement from exchange/conversion', () => {
  const p = captureLegacyState().procedures.find(p => p.title === 'Biliary Drain Placement and Internalization/Exchange');
  const find = title => Object.values(p.nodes).find(n => n.title === title);
  assert.deepEqual(find('Pre-procedure orders').details.Placement, ['INR and CBC within 30 days.']);
  assert.match(JSON.stringify(find('Pre-procedure orders').details['Exchange/conversion']), /No routine/);
  assert.ok(!find('Pre-procedure orders').details['Routine orders'].includes('CBC.'));
  const discharge = find('Post-procedure').checklistSections.find(s => s.title === 'Discharge - if outpatient exchange/conversion');
  assert.deepEqual(discharge.items, ['Discharge order with medication reconciliation - 30 minutes.', 'After visit summary: .IRAVSCHOLETUBEORBILIARYDRAIN1.']);
});
test('lung biopsy orders and outpatient discharge remain grouped', () => {
  const p = captureLegacyState().procedures.find(p => p.title === 'Lung Biopsy/Fiducial Marker Placement');
  const nodes = Object.values(p.nodes);
  assert.ok(nodes.find(n => n.title === 'Pre-procedure orders').details['Routine orders'].includes('INR and CBC within 30 days.'));
  const discharge = nodes.find(n => n.title === 'Post-procedure').checklistSections.find(s => s.title === 'Discharge - if outpatient');
  assert.match(discharge.items[0], /^After 2nd CXR: Outpatient: order regular diet\. Inpatient: notify primary team diet is okay\./);
  assert.deepEqual(discharge.items.slice(1), ['Discharge order with medication reconciliation - 3 hours.', 'After visit summary: .IRAVSLUNGBX.']);
});
test('low-risk anticoagulation uses a shared layout and preserves exceptions', () => {
  const all = captureLegacyState().procedures;
  const tab = p => Object.values(p.nodes).find(n => n.title === 'Anticoagulation');
  for (const p of all.filter(p => p.bleedRisk === 'Low')) {
    const n = tab(p);
    assert.deepEqual(Object.keys(n.details).slice(0, 2), ['Anticoagulation', 'Hold'], p.title);
    assert.equal(n.details.Hold.length, 6, p.title);
    const labs = Object.values(p.nodes).find(node => node.title === 'Labs');
    for (const entry of labs?.details?.Labs || []) {
      if (typeof entry !== 'string') continue;
      if (/^(?:PT\/)?INR\b/.test(entry)) assert.equal(entry, 'INR < 2-3.', p.title);
      if (/^Platelets\b/.test(entry)) assert.equal(entry, 'Platelets >20,000/µL.', p.title);
    }
    assert.ok(n.details.Anticoagulation.some(item => item.href === '#anticoagulation-table'), p.title);
  }
  assert.match(JSON.stringify(tab(all.find(p => p.title === 'Chest Tube Placement'))), /Warfarin: hold if INR is not < 3/);
  assert.match(JSON.stringify(tab(all.find(p => p.title === 'Hemorrhoid Artery Embolization')).details.Caveat), /acute hemorrhage/);
  assert.match(JSON.stringify(tab(all.find(p => p.title === 'Cholecystostomy Tube Exchange\/Removal')).details.Caveat), /new access/);
  assert.ok(!tab(all.find(p => p.title === 'PICC Placement')).details.Caveat);
});
test('moderate sedation reference links belong in sedation, not checklists', () => {
  for (const p of captureLegacyState().procedures) {
    const pre = Object.values(p.nodes).find(n => n.title === 'Pre-procedure');
    if (!pre) continue;
    const children = pre.children.map(id => p.nodes[id]);
    const checklist = children.find(n => n.title === 'Checklist');
    const inspect = node => {
      assert.doesNotMatch(JSON.stringify(node), /#moderate-sedation-checklist/, p.title);
      (node.children || []).forEach(id => inspect(p.nodes[id]));
    };
    if (checklist) inspect(checklist);
    const sedation = children.find(n => n.title === 'Sedation');
    if (/moderate sedation/i.test(JSON.stringify(sedation))) {
      assert.match(JSON.stringify(sedation), /#moderate-sedation-checklist/, p.title);
    }
  }
});
test('cholecystostomy placement and exchange/removal have distinct preparation and follow-up', () => {
  const all = captureLegacyState().procedures;
  const placement = all.find(p => p.title === 'Cholecystostomy Tube Placement');
  const exchange = all.find(p => p.title === 'Cholecystostomy Tube Exchange/Removal');
  const node = (p, title) => Object.values(p.nodes).find(n => n.title === title);
  assert.equal(placement.bleedRisk, 'High');
  assert.equal(exchange.bleedRisk, 'Low');
  assert.ok(!node(placement, 'Labs').details.Labs.includes('CBC.'));
  assert.match(JSON.stringify(node(placement, 'Pre-procedure orders')), /CBC and INR within 30 days/);
  assert.match(JSON.stringify(node(placement, 'Checklist')), /Confirm antibiotics/);
  assert.doesNotMatch(JSON.stringify(node(placement, 'Checklist')), /#moderate-sedation-checklist/);
  assert.ok(!node(placement, 'Post-procedure').checklistSections.some(s => s.title === 'Discharge'));
  assert.match(JSON.stringify(node(exchange, 'Labs')), /No labs are routinely ordered/);
  assert.match(JSON.stringify(node(exchange, 'Pre-procedure orders')), /No routine pre-procedure orders/);
  assert.match(JSON.stringify(node(exchange, 'Indication')), /duodenum/);
  assert.match(JSON.stringify(node(exchange, 'Indication')), /Mature tract/);
  assert.equal(node(exchange, 'Indication').details['Removal after acalculous cholecystitis'].length, 3);
  assert.match(JSON.stringify(node(exchange, 'Post-procedure').checklistSections.find(s => s.title === 'Follow up')), /If exchanged or not removed: drain check\/exchange in 2-3 months/);
  assert.ok(articleSchema.safeParse(convert(exchange)).success);
});
const fixture = () => ({ id: 'test', title: 'Test', category: 'IR procedure', root: 'root', nodes: {
  root: { title: 'Test', children: ['intra'] },
  intra: { title: 'Intraprocedure', children: ['anatomy', 'steps'] },
  anatomy: {
    title: 'Anatomy',
    images: [{ src: 'images/anatomy.png', alt: 'Anatomy', caption: 'Original teaching image.' }],
    details: { 'To build out': ['Placeholder'] },
  },
  steps: { title: 'Procedural steps', children: ['access'] },
  access: {
    title: 'Access',
    checklist: [{ strong: 'Prepare access', text: ' carefully.' }],
    afterChecklistDetails: { 'Follow-up': ['Review results.'] },
    children: ['deep'],
  },
  deep: { title: 'Deep topic', details: { Guidance: [{ text: 'Reference', procedureId: 'other' }, 'Preserved detail'] } },
} });
test('descendants preserve order, checklists, links and placeholder callouts', () => {
  const result = convert(fixture());
  const [anatomy, steps] = result.sections[0].subsections;
  assert.deepEqual(anatomy.blocks[0], {
    type: 'image',
    src: 'images/anatomy.png',
    alt: 'Anatomy',
    caption: 'Original teaching image.',
  });
  assert.equal(anatomy.blocks[1].type, 'callout');
  assert.equal(anatomy.blocks[1].variant, 'note');
  assert.deepEqual(steps.blocks, [
    { type: 'heading', text: 'Access' },
    { type: 'checklist', items: [[{ strong: 'Prepare access' }, ' carefully.']] },
    { type: 'heading', text: 'Follow-up' },
    { type: 'list', items: ['Review results.'] },
    { type: 'heading', text: 'Deep topic' },
    { type: 'heading', text: 'Guidance' },
    { type: 'list', items: [[{ link: { text: 'Reference', articleId: 'other' } }], 'Preserved detail'] },
  ]);
});
test('missing nodes, cycles and unsupported calculators abort conversion', () => {
  const missing = fixture(); missing.nodes.deep.children = ['absent'];
  assert.throws(() => convert(missing), /missing node absent/);
  const cycle = fixture(); cycle.nodes.deep.children = ['steps'];
  assert.throws(() => convert(cycle), /cycle/);
  const unknown = fixture(); unknown.nodes.root.calculator = 'unknown';
  assert.throws(() => convert(unknown), /unsupported calculator/);
  const anticoagulation = fixture(); anticoagulation.nodes.root.calculator = 'anticoagulation';
  const convertedAnticoagulation = convert(anticoagulation);
  assert.deepEqual(convertedAnticoagulation.sections[0].blocks, [{ type: "calculator", calculator: "anticoagulation" }]);
});
test('real migration is deterministic and agrees with all committed articles', () => {
  const run = () => {
    const { procedures, hiddenProcedureTitles } = captureLegacyState();
    return procedures.map((p) => convertProcedure(p, hiddenProcedureTitles, report()));
  };
  const articles = run();
  assert.equal(articles.length, 61);
  assert.deepEqual(articles, run());
  for (const article of articles) {
    assert.equal(articleSchema.safeParse(article).success, true, article.id);
    assert.equal(JSON.stringify(article, null, 2) + '\n', readFileSync(new URL(`../content/articles/${article.id}/article.json`, import.meta.url), 'utf8'));
  }
  const meld = articles.find((a) => a.id === 'meld-score-reference');
  assert.equal(meld.title, 'MELD Calculator');
  assert.equal(JSON.stringify(meld).match(/"type":"calculator"/g).length, 1);
  assert.equal(meld.sections[0].blocks[0].calculator, 'meld');
  const broken = structuredClone(meld);
  broken.sections[0].blocks[0].calculator = 'unknown';
  assert.equal(articleSchema.safeParse(broken).success, false);
});
test('every legacy intraprocedure descendant is represented in generated blocks', () => {
  const { procedures } = captureLegacyState();
  for (const p of procedures) {
    const section = convert(p).sections.find((s) => s.kind === 'intra');
    if (!section) continue;
    const text = JSON.stringify(section);
    const intra = Object.values(p.nodes).find((n) => n.title === 'Intraprocedure');
    const visit = (id) => {
      const n = p.nodes[id];
      assert.ok(text.includes(n.title), `${p.id}: ${n.title}`);
      for (const items of Object.values(n.details ?? {})) for (const item of items) {
        const value = typeof item === 'string' ? item : item.text;
        assert.ok(text.includes(JSON.stringify(value).slice(1, -1)), `${p.id}: ${value}`);
      }
      for (const item of n.checklist ?? []) assert.ok(text.includes(typeof item === 'string' ? JSON.stringify(item).slice(1, -1) : item.text));
      for (const child of n.children ?? []) visit(child);
    };
    for (const child of intra.children ?? []) visit(child);
  }
});

test('procedures preserve standard pre-procedure tabs with optional final Consent', () => {
  const { procedures } = captureLegacyState();
  let count = 0;
  for (const p of procedures) {
    const pre = convert(p).sections.find((s) => s.kind === 'pre');
    if (!pre) continue;
    count += 1;
    assert.deepEqual(pre.subsections.slice(0, 6).map((s) => s.title), [
      'Indication', 'Anticoagulation', 'Labs', 'Pre-procedure orders', 'Sedation', 'Checklist',
    ], p.title);
    assert.ok(pre.subsections.length === 6 || (pre.subsections.length === 7 && pre.subsections[6].title === 'Consent'), p.title);
    assert.match(JSON.stringify(pre.subsections[5].blocks), /lie flat/i, p.title);
    assert.doesNotMatch(JSON.stringify(pre.subsections[3].blocks), /Confirm sedation plan - patient can lie flat/, p.title);
    assert.ok(!pre.blocks?.length, p.title);
  }
  assert.equal(count, 58);
});

test('post-procedure follow-up is last and drainage flush wording is standardized', () => {
  const { procedures } = captureLegacyState();
  const articles = procedures.map(convert);
  for (const article of articles) {
    const post = article.sections.find(s => s.kind === 'post');
    if (!post) continue;
    for (const blocks of [post.blocks ?? [], ...(post.subsections ?? []).map(s => s.blocks)]) {
      let follow = false;
      for (const block of blocks) {
        if (!['heading', 'checklist', 'callout'].includes(block.type)) continue;
        const isFollow = /^follow[ -]?up$/i.test(block.text ?? block.title ?? '');
        assert.ok(!follow || isFollow, article.id);
        follow ||= isFollow;
      }
    }
    const followIndex = post.subsections?.findIndex(s => /^follow[ -]?up$/i.test(s.title)) ?? -1;
    if (followIndex >= 0) assert.equal(followIndex, post.subsections.length - 1, article.id);
  }
  const drainage = articles.find(a => a.id === 'drainage-catheter-placement-exchange');
  assert.match(JSON.stringify(drainage), /Flush with 10 mL sterile saline twice daily\./);
  assert.match(JSON.stringify(drainage.sections.find(s => s.kind === 'post').blocks.at(-1)), /CT and drain check in 2 weeks/);
});

test('procedure checklists use emphasis and cover shared preprocedure checks', () => {
  let count = 0;
  for (const procedure of captureLegacyState().procedures) {
    const pre = Object.values(procedure.nodes).find(node => node.title === 'Pre-procedure');
    const checklist = pre?.children?.map(id => procedure.nodes[id]).find(node => node.title === 'Checklist');
    if (!checklist) continue;
    count++;
    const items = [...Object.values(checklist.details || {}).flat(), ...(checklist.checklist || []),
      ...(checklist.checklistSections || []).flatMap(section => section.items)];
    for (const item of items) assert.ok(item.strong || item.href || item.procedureId, `${procedure.title}: ${JSON.stringify(item)}`);
    const text = items.map(item => `${item.strong || ''}${item.text || ''}`).join(' ');
    for (const pattern of [/indication/i, /imag|anatomy|ultrasound|\bCT\b|\bMRI\b/i, /labs|CBC|coagulation/i, /anticoag/i, /NPO/i, /consent/i]) {
      assert.match(text, pattern, procedure.title);
    }
  }
  assert.equal(count, 58);
  const articles = captureLegacyState().procedures.map(convert);
  const exchange = articles.find(a => a.id === 'gastrostomy-gastrojejunostomy-jejunostomy-tube-exchange');
  assert.match(JSON.stringify(exchange), /unless further indicated/);
  const celiac = articles.find(a => a.id === 'celiac-plexus-block-neurolysis');
  const intra = celiac.sections.find(s => s.kind === 'intra');
  assert.deepEqual(intra.subsections.map(s => s.title), ['Anatomy', 'Procedural steps', 'Pitfalls and safety']);
  assert.doesNotMatch(JSON.stringify(intra), /To build|Future edit/);
  assert.match(JSON.stringify(intra), /neuraxial/);
});

test('checklist order and sedation labels are consistent without flattening pathways', () => {
  const { procedures } = captureLegacyState();
  const text = item => typeof item === 'string' ? item : `${item.strong || ''}${item.text || ''}`;
  for (const p of procedures) {
    const pre = Object.values(p.nodes).find(n => n.title === 'Pre-procedure');
    const children = pre?.children?.map(id => p.nodes[id]) || [];
    const checklist = children.find(n => n.title === 'Checklist');
    if (!checklist) continue;
    const items = checklist.checklistSections?.[0].items || Object.values(checklist.details)[0];
    const lines = items.map(text);
    assert.match(lines[0], /^Confirm indication/, p.title);
    assert.doesNotMatch(lines[0], /review imaging/i, p.title);
    const sedation = lines.findIndex(line => line.startsWith('Confirm sedation plan'));
    const positioning = lines.findIndex(line => line.startsWith('Confirm positioning'));
    const npo = lines.findIndex(line => line.startsWith('Confirm NPO status'));
    assert.ok(sedation >= 0 && positioning === -1 && npo === -1, p.title);
    assert.match(lines[sedation], /lie flat.*positioning.*NPO status/, p.title);
    assert.equal(lines.filter(line => line.startsWith('Confirm sedation plan')).length, 1, p.title);
    const guidance = children.find(n => n.title === 'Sedation');
    if (guidance?.details?.Sedation) {
      assert.equal(guidance.summary, '');
      assert.ok(['Preferred:', 'Options:'].includes(guidance.details.Sedation[0].strong), p.title);
    }
  }
  const pae = procedures.find(p => p.title === 'Prostate Artery Embolization');
  const checklist = Object.values(pae.nodes).find(n => n.title === 'Checklist');
  assert.ok(checklist.details['If for LUTS from BPH']);
  assert.ok(checklist.details['If for refractory hematuria of prostatic origin']);
  const exchange = procedures.find(p => p.title === 'Gastrostomy/Gastrojejunostomy/Jejunostomy Tube Exchange');
  assert.match(JSON.stringify(exchange), /no labs unless further indicated/);
});

test('labs and contraindications follow shared formatting with preserved thresholds', () => {
  for (const p of captureLegacyState().procedures) {
    const pre = Object.values(p.nodes).find(n => n.title === 'Pre-procedure');
    if (!pre) continue;
    const children = pre.children.map(id => p.nodes[id]);
    const labs = children.find(n => n.title === 'Labs');
    for (const entries of Object.values(labs?.details || {})) {
      const text = entries.map(e => typeof e === 'string' ? e : e.text || '');
      const inr = text.findIndex(t => /^(PT\/)?INR/.test(t));
      const platelets = text.findIndex(t => /^Platelets/.test(t));
      if (inr >= 0 && platelets >= 0) assert.ok(inr < platelets, p.title);
      for (const value of text.filter(t => /^Platelets\s*[<>]/.test(t))) {
        assert.match(value, /\/µL/, p.title);
        assert.doesNotMatch(value, /\d+k\b/, p.title);
      }
    }
    const indication = children.find(n => n.title === 'Indication');
    const contraindication = indication.children.map(id => p.nodes[id]).find(n => n.title === 'Contraindications');
    assert.ok(contraindication, p.title);
    assert.ok(contraindication.details.Contraindications.length <= 4, p.title);
  }
  const celiac = convert(captureLegacyState().procedures.find(p => p.id === 'celiac-plexus-block-neurolysis'));
  assert.match(JSON.stringify(celiac), /50,000\/µL/);
  assert.match(JSON.stringify(celiac), /PIV placement\./);
  assert.doesNotMatch(JSON.stringify(celiac), /not left arm/);
});

test('postprocedure sections group monitoring and place discharge before final follow-up', () => {
  const { procedures } = captureLegacyState();
  for (const p of procedures) {
    const post = Object.values(p.nodes).find(n => n.title === 'Post-procedure');
    const sections = post?.checklistSections || [];
    const titles = sections.map(s => s.title);
    assert.ok(!titles.includes('Monitoring'), p.title);
    const discharge = titles.indexOf('Discharge');
    const follow = titles.indexOf('Follow up');
    if (follow >= 0) assert.equal(follow, titles.length - 1, p.title);
    if (discharge >= 0) assert.equal(discharge, titles.length - (follow >= 0 ? 2 : 1), p.title);
    for (const section of sections) {
      for (const entry of section.items) {
        const text = typeof entry === 'string' ? entry.text || '' : entry.text || '';
        const value = typeof entry === 'string' ? entry : text.trim();
        if (/^Vital signs/i.test(value)) assert.equal(section.title, p.id === 'adrenal-vein-sampling' ? 'Routine orders - before lab results have returned' : 'Routine orders', p.title);
        if (/^Monitor (?:color of )?access site|^Neurovascular checks/i.test(value)) assert.equal(section.title, 'Access care', p.title);
      }
    }
  }
  const avs = Object.values(procedures.find(p => p.title === 'Adrenal Vein Sampling').nodes).find(n => n.title === 'Post-procedure');
  const afterResults = avs.checklistSections.find(s => s.title === 'After lab results have returned');
  assert.match(JSON.stringify(afterResults), /Discharge order.*2 hours/);
  assert.match(JSON.stringify(afterResults), /IRAVSVENOGRAM/);
  assert.ok(!avs.checklistSections.some(s => s.title === 'Discharge'));
  const pae = Object.values(procedures.find(p => p.title === 'Prostate Artery Embolization').nodes).find(n => n.title === 'Post-procedure');
  assert.match(JSON.stringify(pae.checklistSections.find(s => s.title === 'Routine orders')), /every 15 minutes x 4/);
  assert.match(JSON.stringify(pae.checklistSections.find(s => s.title === 'Discharge')), /Medications for LUTS\/BPH/);
  const renderer = readFileSync(new URL('../src/components/article/BlockRenderer.tsx', import.meta.url), 'utf8');
  assert.doesNotMatch(renderer, /type="checkbox"|setChecked|checkedText/);
});

test('order relocation preserves infusion setups, medication timing and conditional orders', () => {
  const { procedures } = captureLegacyState();
  const articles = procedures.map(convert);
  const topic = (id, title) => articles.find((a) => a.id === id).sections
    .find((s) => s.kind === 'pre').subsections.find((s) => s.title === title);
  const orders = (id) => topic(id, 'Pre-procedure orders').blocks;

  const avs = JSON.stringify(orders('adrenal-vein-sampling'));
  assert.ok(avs.includes('250 mcg IV cosyntropin in 250 ml @ 50 mcg/hour to start 30-60 min prior to procedure. Lay flat after start of infusion.'));
  assert.doesNotMatch(JSON.stringify(topic('adrenal-vein-sampling', 'Labs')), /cosyntropin|PIV|Glucose/);

  const lysis = orders('catheter-directed-thrombolysis');
  const groups = [
    ['One infusion catheter and sheath', [
      'Heparin (FLAT RATE) at 500 units/hr: 1 order.',
      'Sodium chloride infusion 20 mL/hr: 1 order.',
      'Alteplase 1 mg/hr: 1 order.',
    ]],
    ['Two infusion catheters and sheaths (Site A and Site B)', [
      'Heparin (FLAT RATE) at 250 units/hr: 2 orders.',
      'Sodium chloride infusion 20 mL/hr: 2 orders.',
      'Alteplase 0.5 mg/hr: 2 orders.',
    ]],
    ['Two infusion catheters through one sheath', [
      'Heparin (FLAT RATE) at 500 units/hr: 1 order.',
      'Sodium chloride infusion 20 mL/hr: 2 orders.',
      'Alteplase 0.5 mg/hr: 2 orders.',
    ]],
  ];
  for (const [heading, items] of groups) {
    const index = lysis.findIndex((b) => b.type === 'heading' && b.text === heading);
    assert.ok(index >= 0, heading);
    assert.deepEqual(lysis[index + 1].items, items, heading);
  }
  const indication = topic('catheter-directed-thrombolysis', 'Indication');
  assert.ok(indication.blocks.some((b) => b.type === 'callout' && b.variant === 'contraindication'));

  const ufe = orders('uterine-fibroid-embolization-ufe');
  assert.ok(ufe.some((b) => b.type === 'list' && b.items.includes('Start 1 day prior to procedure; to be ordered in clinic.')));
  const surgical = ufe.find((b) => b.type === 'checklist' && b.title === 'If pre-surgical');
  assert.ok(surgical.items.includes('No NSAIDs or dexamethasone.'));

  const pae = orders('prostate-artery-embolization');
  assert.deepEqual(pae.filter(b => b.type === 'heading').map(b => b.text), [
    'LUTS from BPH - routine orders (day of)',
    'LUTS from BPH - ordered in clinic',
    'Refractory hematuria - routine orders',
  ]);
  const dayOf = ['NPO (if moderate sedation).', 'Vital signs per routine.', 'PIV placement (not left arm).'];
  assert.deepEqual(pae[1].items, [...dayOf, 'INR, CBC, and BMP within 30 days.', 'Pulse checks.']);
  assert.deepEqual(pae[5].items, [...dayOf, 'Glucose POC.', 'Pulse checks.']);
  const clinicIndex = pae.findIndex((b) => b.type === 'heading' && b.text === 'LUTS from BPH - ordered in clinic');
  assert.ok(clinicIndex >= 0);
  assert.ok(pae[clinicIndex + 1].items.includes('Bactrim 800-160 mg BID x 10 days total starting 2 days prior to procedure.'));

  const gTube = 'gastrostomy-gastrojejunostomy-jejunostomy-tube-placement';
  assert.match(JSON.stringify(orders(gTube)), /Barium sulfate 60% \(w\/v\) oral suspension, 355 mL/);
  assert.match(JSON.stringify(orders(gTube)), /entire bottle via NG\/OG\/DHT at 2330 the night before the scheduled procedure/);
  assert.match(JSON.stringify(topic(gTube, 'Sedation')), /head\/neck cancer, dysphagia, or dementia/);
  assert.doesNotMatch(JSON.stringify(topic(gTube, 'Checklist')), /Barium order to be administered|Ancef 2 g/);
});
