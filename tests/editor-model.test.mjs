import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { articleSchema } from '../src/schema/article.ts';
import {
  canonicalBlock, describeChanges, findProblems, newArticle, newBlock, newSection, newSubsection,
  slugify, tidyArticle, uniqueId, NEW_BLOCK_CHOICES,
} from '../src/editor/model.ts';
import { concatRichText, isEmptyRichText, normalizeRichText, richTextEquals, richTextToPlain } from '../src/editor/richTextDom.ts';

const dir = new URL('../content/articles/', import.meta.url);
const articles = readdirSync(dir).map((id) => JSON.parse(readFileSync(new URL(`${id}/article.json`, dir), 'utf8')));
const article = (id) => structuredClone(articles.find((a) => a.id === id));
const tidy = (a, isNew = false) => tidyArticle(a, { isNew });
const withBlocks = (blocks) => ({ ...newArticle({ title: 'T', category: 'reference', bleedRisk: null }), sections: [{ id: 'pre', kind: 'pre', title: 'Pre', blocks }] });
const blocksOf = (a) => a.sections[0].blocks;

test('tidying leaves every existing article exactly as it is', () => {
  assert.equal(articles.length, 61);
  for (const a of articles) {
    const result = tidy(a);
    assert.equal(result, a, `${a.id} was rewritten`);
  }
});

test('tidying removes blanks left by an editing session, and nothing else', () => {
  const result = tidy(withBlocks([
    { type: 'paragraph', text: '  ' },
    { type: 'heading', text: '' },
    { type: 'list', items: ['keep', '', [{ strong: 'bold' }]] },
    { type: 'list', items: ['', ''] },
    { type: 'checklist', title: ' ', items: ['a', ''] },
    { type: 'checklist', title: 'Kept title', items: [''] },
    { type: 'paragraph', text: 'real' },
  ]));
  assert.deepEqual(blocksOf(result), [
    { type: 'list', items: ['keep', [{ strong: 'bold' }]] },
    { type: 'checklist', items: ['a'] },
    { type: 'paragraph', text: 'real' },
  ]);
});

test('sub-bullets follow their parent when blank bullets above them are removed', () => {
  const result = tidy(withBlocks([
    { type: 'list', items: ['', 'parent', 'last'], subitems: { 1: ['child', ''], 2: [''] } },
    { type: 'list', items: ['', 'solo'], subitems: { 0: ['orphaned child'] } },
  ]));
  assert.deepEqual(blocksOf(result), [
    { type: 'list', items: ['parent', 'last'], subitems: { 0: ['child'] } },
    // A blank bullet that still has sub-bullets is kept: its children are content.
    { type: 'list', items: ['', 'solo'], subitems: { 0: ['orphaned child'] } },
  ]);
});

test('a box is only removed when it holds nothing at all', () => {
  const blank = { type: 'callout', variant: 'pearl', blocks: [{ type: 'list', items: [''] }] };
  const titleOnly = { type: 'callout', variant: 'pearl', title: 'Only a title', blocks: [{ type: 'list', items: [''] }] };
  const bodyOnly = { type: 'callout', variant: 'note', title: '', blocks: [{ type: 'paragraph', text: 'body' }] };
  const nested = { type: 'callout', variant: 'note', blocks: [blank] };
  assert.deepEqual(blocksOf(tidy(withBlocks([blank, titleOnly, bodyOnly, nested]))), [
    { type: 'callout', variant: 'pearl', title: 'Only a title', blocks: [] },
    { type: 'callout', variant: 'note', blocks: [{ type: 'paragraph', text: 'body' }] },
  ]);
});

test('optional captions and notes are dropped when blank', () => {
  const result = tidy(withBlocks([
    { type: 'image', src: 'images/a.png', alt: '', caption: ' ' },
    { type: 'table', note: '', caption: '', header: ['a'], rows: [['b']] },
  ]));
  assert.deepEqual(blocksOf(result), [
    { type: 'image', src: 'images/a.png', alt: '' },
    { type: 'table', header: ['a'], rows: [['b']] },
  ]);
});

test('new topics and sections get ids from their titles; existing ids never change', () => {
  const a = article('paracentesis');
  const before = a.sections[0].subsections.map((s) => s.id);
  a.sections[0].subsections[0].title = 'Completely Renamed';
  a.sections[0].subsections.push({ ...newSubsection(), title: 'Labs' }, { ...newSubsection(), title: 'Brand New: Topic!' }, newSubsection());
  a.sections.push({ ...newSection('custom', 'Pre'), blocks: [{ type: 'paragraph', text: 'x' }] });
  const result = tidy(a);
  const ids = result.sections[0].subsections.map((s) => s.id);
  assert.deepEqual(ids.slice(0, before.length), before);
  assert.deepEqual(ids.slice(before.length), ['labs-2', 'brand-new-topic', 'topic']);
  assert.equal(new Set(ids).size, ids.length);
  assert.equal(result.sections.at(-1).id, 'pre-2');
  assert.equal(result.id, 'paracentesis');
  // The untitled topic is still a schema error, reported in plain words.
  const problems = findProblems(result, { folderId: 'paracentesis', knownArticleIds: new Set(['paracentesis']), imageExists: () => true });
  assert.deepEqual(problems, ['A topic in Pre-procedure needs a title.']);
});

test('a new procedure takes its address from its title', () => {
  const fresh = newArticle({ title: '', category: 'reference', bleedRisk: null });
  assert.deepEqual(findProblems(tidy(fresh, true), { folderId: '', knownArticleIds: new Set(), imageExists: () => true }), ['Give the procedure a title.']);
  const named = tidy({ ...fresh, title: 'Röntgen-guided  Biopsy (v2)' }, true);
  assert.equal(named.id, 'rontgen-guided-biopsy-v2');
  assert.equal(articleSchema.safeParse(named).success, true);
  assert.deepEqual(findProblems(named, { folderId: named.id, knownArticleIds: new Set([named.id]), imageExists: () => true }), []);
});

test('problems are described for people', () => {
  const a = article('paracentesis');
  a.sections[0].blocks = [
    { type: 'image', src: 'images/missing.png', alt: '' },
    { type: 'paragraph', text: [{ link: { text: 'gone', articleId: 'no-such' } }, { link: { text: 'bad', href: 'javascript:alert(1)' } }] },
  ];
  const problems = findProblems(a, { folderId: 'paracentesis', knownArticleIds: new Set(['paracentesis']), imageExists: () => false });
  assert.ok(problems.some((p) => /An image is missing its file \(images\/missing\.png\)/.test(p)));
  assert.ok(problems.some((p) => /procedure that does not exist \(no-such\)/.test(p)));
  assert.ok(problems.some((p) => /link address not allowed/.test(p)));
});

test('a freshly added, still-blank block never blocks publishing; keys follow file order', () => {
  for (const { kind } of NEW_BLOCK_CHOICES) {
    if (kind === 'image') continue;
    // Added and left empty: tidying removes it (or, for a table, leaves a valid one).
    const a = tidy(withBlocks([newBlock(kind), { type: 'paragraph', text: 'real' }]));
    assert.equal(articleSchema.safeParse(a).success, true, kind);
    assert.equal(blocksOf(a).length, kind === 'table' ? 2 : 1, kind);
  }
  assert.deepEqual(Object.keys(canonicalBlock({ blocks: [], collapsible: true, title: 't', variant: 'note', type: 'callout' })), ['type', 'variant', 'title', 'collapsible', 'blocks']);
  assert.deepEqual(Object.keys(canonicalBlock({ type: 'list', items: [], subitems: {}, ordered: undefined })), ['type', 'items', 'subitems']);
  const untouched = { type: 'list', items: ['a'] };
  assert.equal(canonicalBlock(untouched), untouched);
});

test('change summaries name what was touched', () => {
  const before = article('paracentesis');
  const after = structuredClone(before);
  assert.deepEqual(describeChanges(before, after), []);
  after.summary = 'new';
  after.sections[0].subsections[1].blocks.push({ type: 'paragraph', text: 'x' });
  after.sections[0].subsections.push({ id: 'added', title: 'Added', blocks: [] });
  after.sections[0].subsections.splice(0, 1);
  after.sections[2].blocks = [...(after.sections[2].blocks ?? []), { type: 'paragraph', text: 'y' }];
  const names = describeChanges(before, after);
  assert.deepEqual(names, [
    'Details',
    `Pre-procedure › ${before.sections[0].subsections[1].title}`,
    'Pre-procedure › Added (new)',
    `Pre-procedure › ${before.sections[0].subsections[0].title} (removed)`,
    'Post-procedure',
  ]);
});

test('rich text helpers', () => {
  assert.equal(normalizeRichText(['a', '', 'b']), 'ab');
  assert.deepEqual(normalizeRichText([{ strong: 'a' }, { strong: 'b' }, '', 'c']), [{ strong: 'ab' }, 'c']);
  assert.ok(richTextEquals([{ strong: 'X' }, ''], [{ strong: 'X' }]));
  assert.ok(!richTextEquals('a', 'b'));
  assert.deepEqual(concatRichText([{ strong: 'a' }], 'b'), [{ strong: 'a' }, 'b']);
  assert.equal(concatRichText('a', 'b'), 'ab');
  const half = (text) => ({ link: { text, articleId: 'x', sectionId: 'pre' } });
  assert.deepEqual(concatRichText([half('Open ')], [half('table')]), [half('Open table')]);
  assert.deepEqual(concatRichText([half('a')], [{ link: { text: 'b', articleId: 'y' } }]).length, 2);
  assert.equal(richTextToPlain(['a ', { strong: 'b' }, { link: { text: ' c', href: 'https://x.test' } }]), 'a b c');
  assert.ok(isEmptyRichText(['', ' ']));
  assert.equal(slugify('  Hello, World!  '), 'hello-world');
  assert.equal(uniqueId('a', ['a', 'a-2']), 'a-3');
});
