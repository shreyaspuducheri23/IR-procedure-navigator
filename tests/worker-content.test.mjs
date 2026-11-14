import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../worker/src/index.ts';
import { FakeGitHub, blobSha } from './helpers/fake-github.mjs';

const ORIGIN = 'https://site.example';
const baseEnv = {
  github_pat: 'token',
  GITHUB_OWNER: 'owner',
  GITHUB_REPO: 'repo',
  ALLOWED_ORIGINS: `${ORIGIN},http://localhost:5173`,
  GITHUB_API_BASE: 'https://api.github.test',
};

/** A fresh fake repo wired in as global fetch, plus a helper to call the Worker. */
function setup(env = {}) {
  const github = new FakeGitHub().seedFromDisk();
  /** Optional hook: runs before each GitHub request, e.g. to race a commit in. */
  const hooks = { before: null };
  globalThis.fetch = async (input, init) => {
    const request = new Request(input, init);
    await hooks.before?.(request);
    return github.handle(request);
  };
  const call = async (method, path, { body, origin = ORIGIN, headers = {} } = {}) => {
    const response = await worker.fetch(
      new Request(`https://worker.test${path}`, {
        method,
        headers: { ...(origin ? { origin } : {}), 'content-type': 'application/json', ...headers },
        body: body === undefined ? undefined : typeof body === 'string' ? body : JSON.stringify(body),
      }),
      { ...baseEnv, ...env },
    );
    return { status: response.status, data: await response.json().catch(() => null), headers: response.headers };
  };
  const load = async (id) => (await call('GET', `/content/articles/${id}`)).data;
  const save = (id, body, options) => call('PUT', `/content/articles/${id}`, { body: { editor: 'Dr Test', ...body }, ...options });
  return { github, hooks, call, load, save };
}

const filePath = (id) => `content/articles/${id}/article.json`;
const PNG = Buffer.from('89504e470d0a1a0a0000000d49484452', 'hex').toString('base64');

function changedPaths(before, after) {
  const paths = new Set([...before.keys(), ...after.keys()]);
  return [...paths].filter((p) => before.get(p) !== after.get(p)).sort();
}

test('GET returns the article, its blob sha, and its images', async () => {
  const { github, load, call } = setup();
  const data = await load('paracentesis');
  assert.equal(data.ok, true);
  assert.equal(data.article.id, 'paracentesis');
  assert.equal(data.sha, blobSha(github.read(filePath('paracentesis'))));
  assert.deepEqual(data.images, ['paracentesis-anatomy.png', 'paracentesis-cross-section.png']);
  assert.equal((await call('GET', '/content/articles/no-such-article')).status, 404);
});

test('saving every article unchanged is a no-op: formatting round-trips byte for byte', async () => {
  const { github, load, save } = setup();
  const commits = github.commitCount();
  const ids = [...github.files().keys()].filter((p) => p.endsWith('/article.json')).map((p) => p.split('/')[2]);
  assert.equal(ids.length, 61);
  for (const id of ids) {
    const { article, sha } = await load(id);
    const { status, data } = await save(id, { article, baseSha: sha });
    assert.equal(status, 200, `${id}: ${data?.error}`);
    assert.equal(data.unchanged, true, id);
    assert.equal(data.sha, sha, id);
  }
  assert.equal(github.commitCount(), commits);
});

test('an edit becomes exactly one commit touching only that article.json', async () => {
  const { github, load, save } = setup();
  const before = new Map(github.files());
  const commits = github.commitCount();
  const { article, sha } = await load('paracentesis');
  article.summary = 'Edited summary.';

  const { status, data } = await save('paracentesis', { article, baseSha: sha, note: 'Tightened wording' });
  assert.equal(status, 200, data?.error);
  assert.equal(data.unchanged, false);
  assert.equal(github.commitCount(), commits + 1);
  assert.deepEqual(changedPaths(before, github.files()), [filePath('paracentesis')]);
  assert.equal(github.readText(filePath('paracentesis')), JSON.stringify(article, null, 2) + '\n');
  assert.equal(data.sha, blobSha(github.read(filePath('paracentesis'))));
  assert.equal(github.headCommit().message, 'Edit Paracentesis via web editor (Dr Test)\n\nTightened wording');
  assert.equal(data.commitUrl, `https://github.com/owner/repo/commit/${github.headCommit().sha}`);

  // The returned sha is the new base: a follow-up save works, the old base does not.
  article.summary = 'Edited again.';
  assert.equal((await save('paracentesis', { article, baseSha: data.sha })).status, 200);
  const stale = await save('paracentesis', { article, baseSha: sha });
  assert.equal(stale.status, 409);
  assert.equal(stale.data.conflict, 'stale');
});

test('a concurrent change to the same article is refused, not overwritten', async () => {
  const { github, load, save } = setup();
  const { article, sha } = await load('paracentesis');
  const theirs = { ...article, summary: 'Their change.' };
  github.writeDirect(filePath('paracentesis'), JSON.stringify(theirs, null, 2) + '\n');
  article.summary = 'My change.';
  const { status, data } = await save('paracentesis', { article, baseSha: sha });
  assert.equal(status, 409);
  assert.match(data.error, /Someone else published/);
  assert.match(github.readText(filePath('paracentesis')), /Their change\./);
});

test('a concurrent change elsewhere in the repo is retried, and both changes survive', async () => {
  const { github, hooks, load, save } = setup();
  const { article, sha } = await load('paracentesis');
  article.summary = 'My change.';
  let raced = false;
  hooks.before = (request) => {
    if (!raced && request.method === 'POST' && request.url.endsWith('/git/commits')) {
      raced = true;
      github.writeDirect('README.md', '# changed underneath\n');
    }
  };
  const { status, data } = await save('paracentesis', { article, baseSha: sha });
  assert.equal(status, 200, data?.error);
  assert.equal(raced, true);
  assert.equal(github.readText('README.md'), '# changed underneath\n');
  assert.match(github.readText(filePath('paracentesis')), /My change\./);
});

test('the path jail: nothing outside content/articles/<id>/ can be addressed or written', async () => {
  const { github, call, load, save } = setup();
  const before = new Map(github.files());
  const { article, sha } = await load('paracentesis');
  const body = { article, baseSha: sha, editor: 'x' };

  for (const path of [
    '/content/articles/../../README.md',
    '/content/articles/%2e%2e%2f%2e%2e%2fREADME.md',
    '/content/articles/paracentesis/article.json',
    '/content/articles/paracentesis%2fimages',
    '/content/articles/Paracentesis',
    '/content/articles/',
    '/content/other/paracentesis',
    '/.github/workflows/deploy.yml',
  ]) {
    const { status } = await call('PUT', path, { body });
    assert.ok(status === 404 || status === 405, `${path} -> ${status}`);
  }

  // The body cannot redirect a save to another article either.
  const mismatch = await save('thoracentesis', { article, baseSha: sha });
  assert.equal(mismatch.status, 400);
  assert.match(mismatch.data.error, /does not match the address/);

  // Image names and image references are flat files in the article's images/ folder.
  const withImage = (src) => {
    const copy = structuredClone(article);
    copy.sections[0].blocks = [...(copy.sections[0].blocks ?? []), { type: 'image', src, alt: '' }];
    return copy;
  };
  for (const name of ['../evil.png', 'a/b.png', 'evil.svg', 'evil.html', 'UPPER.PNG', '.hidden.png', 'x.png/../../y.png']) {
    const result = await save('paracentesis', { article: withImage(`images/${name}`), baseSha: sha, images: [{ name, data: PNG }] });
    assert.equal(result.status, 400, name);
  }
  for (const src of ['images/../../../README.md', '../thoracentesis/images/x.png', '/etc/passwd', 'https://evil.example/x.png']) {
    const result = await save('paracentesis', { article: withImage(src), baseSha: sha });
    assert.equal(result.status, 400, src);
  }

  assert.deepEqual(changedPaths(before, github.files()), []);
});

test('an uploaded image is committed with the article in one commit', async () => {
  const { github, load, save } = setup();
  const before = new Map(github.files());
  const commits = github.commitCount();
  const { article, sha } = await load('paracentesis');
  article.sections[0].blocks = [{ type: 'image', src: 'images/new-diagram.png', alt: 'Diagram' }];

  const missing = await save('paracentesis', { article, baseSha: sha });
  assert.equal(missing.status, 400);
  assert.match(missing.data.error, /image not found/);

  const { status, data } = await save('paracentesis', { article, baseSha: sha, images: [{ name: 'new-diagram.png', data: PNG }] });
  assert.equal(status, 200, data?.error);
  assert.equal(github.commitCount(), commits + 1);
  assert.deepEqual(changedPaths(before, github.files()), [
    filePath('paracentesis'),
    'content/articles/paracentesis/images/new-diagram.png',
  ]);
  assert.equal(github.read('content/articles/paracentesis/images/new-diagram.png').toString('base64'), PNG);
});

test('image uploads are bounded and must be used', async () => {
  const { load, save } = setup();
  const { article, sha } = await load('paracentesis');
  const unused = await save('paracentesis', { article, baseSha: sha, images: [{ name: 'unused.png', data: PNG }] });
  assert.equal(unused.status, 400);
  assert.match(unused.data.error, /not used/);

  const existing = structuredClone(article);
  const clash = await save('paracentesis', { article: existing, baseSha: sha, images: [{ name: 'paracentesis-anatomy.png', data: PNG }] });
  assert.equal(clash.status, 409);

  const five = Array.from({ length: 5 }, (_, i) => ({ name: `n${i}.png`, data: PNG }));
  assert.equal((await save('paracentesis', { article, baseSha: sha, images: five })).status, 400);
  assert.equal((await save('paracentesis', { article, baseSha: sha, images: [{ name: 'bad.png', data: '<svg onload=alert(1)>' }] })).status, 400);
  const huge = 'A'.repeat(Math.ceil((5 * 1024 * 1024 * 4) / 3 / 4) * 4 + 4);
  assert.equal((await save('paracentesis', { article, baseSha: sha, images: [{ name: 'huge.png', data: huge }] })).status, 400);
});

test('articles that would fail CI are rejected before they are committed', async () => {
  const { github, load, save } = setup();
  const commits = github.commitCount();
  const { article, sha } = await load('paracentesis');
  const variants = {
    'missing title': (a) => { delete a.title; },
    'unknown field': (a) => { a.script = '<script>'; },
    'unknown nested field': (a) => { a.sections[0].onclick = 'x'; },
    'unknown block type': (a) => { a.sections[0].blocks = [{ type: 'html', html: '<b>' }]; },
    'unknown category': (a) => { a.category = 'nope'; },
    'bad section id': (a) => { a.sections[0].id = 'Not A Slug'; },
    'duplicate section ids': (a) => { a.sections[1].id = a.sections[0].id; },
    'dangling internal link': (a) => { a.sections[0].blocks = [{ type: 'paragraph', text: [{ link: { text: 'x', articleId: 'no-such-article' } }] }]; },
  };
  for (const [name, mutate] of Object.entries(variants)) {
    const copy = structuredClone(article);
    mutate(copy);
    const { status } = await save('paracentesis', { article: copy, baseSha: sha });
    assert.equal(status, 400, name);
  }
  assert.equal((await save('paracentesis', { article, baseSha: sha, editor: '   ' })).status, 400);
  assert.equal((await save('paracentesis', { article, baseSha: 'not-a-sha' })).status, 400);
  assert.equal((await save('paracentesis', '{not json')).status, 400);
  assert.equal(github.commitCount(), commits);
});

test('new articles can be created, but never over an existing one', async () => {
  const { github, load, save } = setup();
  const { article } = await load('paracentesis');
  const fresh = { ...structuredClone(article), id: 'brand-new-procedure', title: 'Brand New Procedure', status: 'draft' };
  fresh.sections.forEach((section) => { section.blocks = (section.blocks ?? []).filter((b) => b.type !== 'image'); section.subsections?.forEach((s) => { s.blocks = s.blocks.filter((b) => b.type !== 'image'); }); });

  const created = await save('brand-new-procedure', { article: fresh, baseSha: null });
  assert.equal(created.status, 200, created.data?.error);
  assert.match(github.headCommit().message, /^Add Brand New Procedure via web editor/);
  assert.ok(github.read(filePath('brand-new-procedure')));

  const again = await save('brand-new-procedure', { article: fresh, baseSha: null });
  assert.equal(again.status, 409);
  assert.equal(again.data.conflict, 'exists');

  const gone = await save('never-existed', { article: { ...fresh, id: 'never-existed' }, baseSha: created.data.sha });
  assert.equal(gone.status, 409);
});

test('commit message fields cannot inject extra lines', async () => {
  const { github, load, save } = setup();
  const { article, sha } = await load('paracentesis');
  article.summary = 'x';
  const { status } = await save('paracentesis', { article, baseSha: sha, editor: 'Mallory\n\nCo-authored-by: someone', note: 'a\nb' });
  assert.equal(status, 200);
  assert.equal(github.headCommit().message, 'Edit Paracentesis via web editor (Mallory Co-authored-by: someone)\n\na b');
});

test('only the site origins may call the content routes', async () => {
  const { load, call } = setup();
  const { article, sha } = await load('paracentesis');
  const body = { article, baseSha: sha, editor: 'x' };
  assert.equal((await call('PUT', '/content/articles/paracentesis', { body, origin: 'https://evil.example' })).status, 403);
  assert.equal((await call('PUT', '/content/articles/paracentesis', { body, origin: null })).status, 403);
  assert.equal((await call('GET', '/content/articles/paracentesis', { origin: 'https://evil.example' })).status, 403);
  assert.equal((await call('GET', '/content/articles/paracentesis', { origin: 'http://localhost:5173' })).status, 200);

  const preflight = await call('OPTIONS', '/content/articles/paracentesis');
  assert.equal(preflight.status, 204);
  assert.match(preflight.headers.get('access-control-allow-methods'), /PUT/);
  assert.match(preflight.headers.get('access-control-allow-headers'), /x-edit-key/);
  assert.equal(preflight.headers.get('access-control-allow-origin'), ORIGIN);
});

test('the optional passcode is enforced only when configured', async () => {
  const open = setup();
  const first = await open.load('paracentesis');
  first.article.summary = 'open';
  assert.equal((await open.save('paracentesis', { article: first.article, baseSha: first.sha })).status, 200);

  const locked = setup({ edit_key: 'correct horse' });
  const { article, sha } = await locked.load('paracentesis');
  article.summary = 'locked';
  const body = { article, baseSha: sha };
  const denied = await locked.save('paracentesis', body);
  assert.equal(denied.status, 401);
  assert.equal(denied.data.needsKey, true);
  assert.equal((await locked.save('paracentesis', body, { headers: { 'x-edit-key': 'wrong' } })).status, 401);
  assert.equal((await locked.save('paracentesis', body, { headers: { 'x-edit-key': 'correct horse' } })).status, 200);
});

test('a token without write access produces an actionable error, and leaks nothing', async () => {
  const { github, load, save } = setup();
  const { article, sha } = await load('paracentesis');
  article.summary = 'x';
  github.failWrites = 403;
  const original = console.error;
  console.error = () => {};
  try {
    const { status, data } = await save('paracentesis', { article, baseSha: sha });
    assert.equal(status, 502);
    assert.match(data.error, /Contents: read and write/);
    assert.doesNotMatch(JSON.stringify(data), /personal access token|token"/);

    github.failWrites = 401;
    const expired = await save('paracentesis', { article, baseSha: sha });
    assert.equal(expired.status, 502);
    assert.match(expired.data.error, /expired or is not valid/);
  } finally {
    console.error = original;
  }
});

test('a Worker with no token stored says so, instead of blaming the token\'s permissions', async () => {
  const { github, call } = setup({ github_pat: undefined });
  const requests = github.log.length;
  const { status, data } = await call('GET', '/content/articles/paracentesis');
  assert.equal(status, 503);
  assert.match(data.error, /no GitHub token stored/);
  assert.equal(github.log.length, requests);
});

test('the feedback route is unchanged', async () => {
  const { github, call } = setup();
  const report = { kind: 'bug', message: 'Something is wrong here.', title: 'Bug', body: 'Body', labels: ['feedback', 'bug', 'invented'] };
  const { status, data } = await call('POST', '/', { body: report });
  assert.equal(status, 200);
  assert.equal(data.url, 'https://github.example/issues/1');
  assert.deepEqual(github.issues[0], { title: 'Bug', body: 'Body', labels: ['feedback', 'bug'] });
  assert.equal((await call('POST', '/', { body: report, origin: 'https://evil.example' })).status, 403);
  assert.equal((await call('POST', '/', { body: { ...report, honeypot: 'bot' } })).data.url, null);
  assert.equal(github.issues.length, 1);
  assert.equal((await call('GET', '/')).status, 405);
  assert.equal((await call('GET', '/anything-else')).status, 404);
});
