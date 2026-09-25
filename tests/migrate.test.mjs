import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { captureLegacyState, convertProcedure } from '../scripts/migrate.mjs';
import { articleSchema } from '../src/schema/article.ts';
const report = () => ({ problems: [], orphans: [], rewrittenLinks: {}, internalLinks: 0, externalLinks: 0 });
const convert = (p) => convertProcedure(p, [], report());
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
  assert.equal(articles.length, 57);
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

test('all procedures have six consistent pre-procedure tabs and positioning in Checklist', () => {
  const { procedures } = captureLegacyState();
  let count = 0;
  for (const p of procedures) {
    const pre = convert(p).sections.find((s) => s.kind === 'pre');
    if (!pre) continue;
    count += 1;
    assert.deepEqual(pre.subsections.map((s) => s.title), [
      'Indication', 'Anticoagulation', 'Labs', 'Pre-procedure orders', 'Sedation', 'Checklist',
    ], p.title);
    assert.match(JSON.stringify(pre.subsections.at(-1).blocks), /lie flat/i, p.title);
    assert.doesNotMatch(JSON.stringify(pre.subsections[3].blocks), /Confirm sedation plan - patient can lie flat/, p.title);
    assert.ok(!pre.blocks?.length, p.title);
  }
  assert.equal(count, 54);
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
  assert.ok(ufe.some((b) => b.type === 'paragraph' && b.text === 'Start 1 day prior to procedure; to be ordered in clinic.'));
  const surgical = ufe.find((b) => b.type === 'checklist' && b.title === 'If pre-surgical');
  assert.ok(surgical.items.includes('No NSAIDs or dexamethasone.'));

  const pae = orders('prostate-artery-embolization');
  const clinicIndex = pae.findIndex((b) => b.type === 'heading' && b.text === 'If for LUTS from BPH - to be ordered in clinic');
  assert.ok(clinicIndex >= 0);
  assert.ok(pae[clinicIndex + 1].items.includes('Bactrim 800-160 mg BID x 10 days total starting 2 days prior to procedure.'));

  const gTube = 'gastrostomy-gastrojejunostomy-jejunostomy-tube-placement';
  assert.match(JSON.stringify(orders(gTube)), /Barium order to be administered ENTIRE bottle the night prior/);
  assert.doesNotMatch(JSON.stringify(topic(gTube, 'Checklist')), /Barium order to be administered|Ancef 2 g/);
});
