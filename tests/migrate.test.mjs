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
  anatomy: { title: 'Anatomy', details: { 'To build out': ['Placeholder'] } },
  steps: { title: 'Procedural steps', children: ['access'] },
  access: { title: 'Access', checklist: ['Prepare access'], children: ['deep'] },
  deep: { title: 'Deep topic', details: { Guidance: [{ text: 'Reference', procedureId: 'other' }, 'Preserved detail'] } },
} });
test('descendants preserve order, checklists, links and placeholder callouts', () => {
  const result = convert(fixture());
  const [anatomy, steps] = result.sections[0].subsections;
  assert.equal(anatomy.blocks[0].type, 'callout');
  assert.equal(anatomy.blocks[0].variant, 'note');
  assert.deepEqual(steps.blocks, [
    { type: 'heading', text: 'Access' },
    { type: 'checklist', items: ['Prepare access'] },
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
