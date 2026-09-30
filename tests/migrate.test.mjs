import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { captureLegacyState, convertProcedure } from '../scripts/migrate.mjs';
import { articleSchema } from '../src/schema/article.ts';
const report = () => ({ problems: [], orphans: [], rewrittenLinks: {}, internalLinks: 0, externalLinks: 0 });
const convert = (p) => convertProcedure(p, [], report());
test('biliary orders distinguish placement from exchange/conversion', () => {
  const p = captureLegacyState().procedures.find(p => p.title === 'Biliary Drain Placement and Internalization/Exchange');
  const find = title => Object.values(p.nodes).find(n => n.title === title);
  assert.deepEqual(find('Pre-procedure orders').details.Placement, ['INR and CBC within 30 days.']);
  assert.match(JSON.stringify(find('Pre-procedure orders').details['Exchange/conversion']), /No routine/);
  assert.ok(!find('Pre-procedure orders').details['Routine orders'].includes('CBC.'));
  const discharge = find('Post-procedure').checklistSections.find(s => s.title === 'Discharge - if outpatient exchange/conversion');
  assert.deepEqual(discharge.items, ['Discharge order with medication reconciliation - 30 minutes.', 'After visit summary: .IRCHOLETUBEBILIARYDRAIN1.']);
});
test('lung biopsy orders and outpatient discharge remain grouped', () => {
  const p = captureLegacyState().procedures.find(p => p.title === 'Lung Biopsy/Fiducial Marker Placement');
  const nodes = Object.values(p.nodes);
  assert.ok(nodes.find(n => n.title === 'Pre-procedure orders').details['Routine orders'].includes('INR and CBC within 30 days.'));
  const discharge = nodes.find(n => n.title === 'Post-procedure').checklistSections.find(s => s.title === 'Discharge - if outpatient');
  assert.deepEqual(discharge.items, ['After 2nd CXR: regular diet and discharge.', 'Discharge order with medication reconciliation.', 'After visit summary: .IRAVSLUNGBX.']);
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
  assert.match(JSON.stringify(node(exchange, 'Labs')), /No routine pre-procedure labs/);
  assert.match(JSON.stringify(node(exchange, 'Pre-procedure orders')), /No routine pre-procedure orders/);
  assert.match(JSON.stringify(node(exchange, 'Indication')), /duodenum/);
  assert.match(JSON.stringify(node(exchange, 'Indication')), /Mature tract/);
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
  assert.equal(articles.length, 58);
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
  assert.equal(count, 55);
});

test('post-procedure follow-up is last and drainage flush is BID', () => {
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
  assert.match(JSON.stringify(drainage), /10 mL twice daily \(BID\)/);
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
  assert.equal(count, 55);
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
  assert.match(JSON.stringify(celiac), /PIV placement \(not left arm\)/);
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
        if (/^Vital signs|^Monitor (?:color of )?access site|^Neurovascular checks/i.test(value)) assert.equal(section.title, p.id === 'adrenal-vein-sampling' ? 'Routine orders - before lab results have returned' : 'Routine orders', p.title);
      }
    }
  }
  const avs = Object.values(procedures.find(p => p.title === 'Adrenal Vein Sampling').nodes).find(n => n.title === 'Post-procedure');
  assert.match(JSON.stringify(avs.checklistSections.find(s => s.title === 'Discharge')), /After lab results have returned/);
  const pae = Object.values(procedures.find(p => p.title === 'Prostate Artery Embolization').nodes).find(n => n.title === 'Post-procedure');
  assert.match(JSON.stringify(pae.checklistSections.find(s => s.title === 'Routine orders')), /every 15 minutes x 4/);
  assert.match(JSON.stringify(pae.checklistSections.find(s => s.title === 'Discharge')), /LUTS secondary to BPH/);
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
  assert.deepEqual(pae[1].items, [...dayOf, 'INR, CBC, and BMP within 30 days.']);
  assert.deepEqual(pae[5].items, [...dayOf, 'Glucose POC.']);
  const clinicIndex = pae.findIndex((b) => b.type === 'heading' && b.text === 'LUTS from BPH - ordered in clinic');
  assert.ok(clinicIndex >= 0);
  assert.ok(pae[clinicIndex + 1].items.includes('Bactrim 800-160 mg BID x 10 days total starting 2 days prior to procedure.'));

  const gTube = 'gastrostomy-gastrojejunostomy-jejunostomy-tube-placement';
  assert.match(JSON.stringify(orders(gTube)), /Barium order to be administered ENTIRE bottle the night prior/);
  assert.doesNotMatch(JSON.stringify(topic(gTube, 'Checklist')), /Barium order to be administered|Ancef 2 g/);
});
