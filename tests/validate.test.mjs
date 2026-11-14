import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { articleSchema } from '../src/schema/article.ts';
import { unknownFields, validateArticle, walkLinks } from '../src/schema/validate.ts';

const load = (id) => JSON.parse(readFileSync(new URL(`../content/articles/${id}/article.json`, import.meta.url), 'utf8'));
const context = (overrides = {}) => ({
  folderId: 'paracentesis',
  knownArticleIds: new Set(['paracentesis', 'anticoagulation-table']),
  imageExists: () => true,
  ...overrides,
});
const withBlocks = (blocks) => {
  const article = load('paracentesis');
  article.sections[0].blocks = blocks;
  return articleSchema.parse(article);
};

test('a sound article has no problems', () => {
  assert.deepEqual(validateArticle(articleSchema.parse(load('paracentesis')), context({ knownArticleIds: undefined })), []);
});

test('folder, category and duplicate ids are checked', () => {
  const article = articleSchema.parse(load('paracentesis'));
  assert.match(validateArticle(article, context({ folderId: 'other' }))[0], /does not match folder "other"/);
  assert.match(validateArticle({ ...article, category: 'nope' }, context())[0], /unknown category/);
  const duplicated = structuredClone(article);
  duplicated.sections[1].id = duplicated.sections[0].id;
  duplicated.sections[0].subsections[1].id = duplicated.sections[0].subsections[0].id;
  assert.deepEqual(validateArticle(duplicated, context()), [
    'duplicate section ids',
    `duplicate subsection ids in section "${duplicated.sections[0].id}"`,
  ]);
});

test('images must be flat files in the article\'s own images folder, and exist', () => {
  const image = (src) => withBlocks([{ type: 'callout', variant: 'note', blocks: [{ type: 'image', src, alt: '' }] }]);
  assert.deepEqual(validateArticle(image('images/ok-1.png'), context()), []);
  assert.match(validateArticle(image('images/ok.png'), context({ imageExists: () => false }))[0], /image not found — images\/ok\.png/);
  for (const src of ['images/../x.png', 'images/a/b.png', '../x.png', 'images/x.svg', 'images/X.png', 'https://x.test/a.png', 'images/.png']) {
    assert.match(validateArticle(image(src), context())[0], /image path not allowed/, src);
  }
});

test('links are checked wherever rich text can appear, including sub-bullets and tables', () => {
  const dangling = [{ link: { text: 'x', articleId: 'missing' } }];
  const places = [
    [{ type: 'paragraph', text: dangling }],
    [{ type: 'list', items: [dangling] }],
    [{ type: 'list', items: ['a'], subitems: { 0: [dangling] } }],
    [{ type: 'checklist', items: [dangling] }],
    [{ type: 'table', header: [dangling], rows: [] }],
    [{ type: 'table', header: ['h'], rows: [[dangling]] }],
    [{ type: 'callout', variant: 'pearl', blocks: [{ type: 'paragraph', text: dangling }] }],
  ];
  for (const blocks of places) {
    assert.deepEqual(validateArticle(withBlocks(blocks), context()), ['internal link to unknown article "missing"'], JSON.stringify(blocks));
  }
  const fine = withBlocks([{ type: 'paragraph', text: [{ link: { text: 'x', articleId: 'anticoagulation-table', sectionId: 'pre' } }] }]);
  assert.deepEqual(validateArticle(fine, context()), []);
  assert.equal([...walkLinks(fine)].filter((link) => link.articleId === 'anticoagulation-table' && link.sectionId === 'pre').length, 1);
});

test('only web, mail and phone addresses are accepted as external links', () => {
  const link = (href) => withBlocks([{ type: 'paragraph', text: [{ link: { text: 'x', href } }] }]);
  for (const href of ['https://example.org/a?b=c#d', 'http://example.org', 'mailto:ir@example.org', 'tel:+15551234']) {
    assert.deepEqual(validateArticle(link(href), context()), [], href);
  }
  for (const href of ['javascript:alert(1)', 'JaVaScRiPt:alert(1)', 'data:text/html,<script>', 'vbscript:x', '//example.org', '/relative', 'https://exa mple.org', ' https://example.org']) {
    assert.match(validateArticle(link(href), context())[0], /link address not allowed/, href);
  }
});

test('unknownFields reports what the schema would silently drop', () => {
  const raw = load('paracentesis');
  assert.deepEqual(unknownFields(raw, articleSchema.parse(raw)), []);
  raw.extra = 1;
  raw.sections[0].subsections[0].blocks[0].title = 'stray';
  raw.sections[0].subsections[0].nested = { deep: true };
  assert.deepEqual(unknownFields(raw, articleSchema.parse(raw)), [
    'sections[0].subsections[0].blocks[0].title',
    'sections[0].subsections[0].nested',
    'extra',
  ]);
});
