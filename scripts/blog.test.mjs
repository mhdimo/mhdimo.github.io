import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import { mkdtemp, rm, writeFile, mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { loadPosts, parsePost } from './blog.mjs';

const temporaryDirectories = [];

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map(directory =>
    rm(directory, { recursive: true, force: true }),
  ));
});

test('parses post metadata and renders GitHub-Flavored Markdown', () => {
  const source = [
    '---',
    'title: "A Systems Note"',
    'date: "2026-08-31"',
    'description: "A short description."',
    'tags: ["LLM", "Systems"]',
    '---',
    '',
    '## Heading',
    '',
    '```cpp',
    'auto value = decode();',
    '```',
    '',
  ].join('\n');

  const post = parsePost(source, 'systems-note.md');

  assert.equal(post.slug, 'systems-note');
  assert.deepEqual(post.tags, ['LLM', 'Systems']);
  assert.match(post.html, /<h2[^>]*>Heading<\/h2>/);
  assert.match(post.html, /<code class="language-cpp">/);
});

test('rejects missing required metadata and unsafe slugs', () => {
  assert.throws(
    () => parsePost('---\ntitle: "Missing date"\n---\nBody', 'missing.md'),
    /date/,
  );

  const unsafe = [
    '---',
    'title: "Unsafe"',
    'date: "2026-08-31"',
    'description: "No"',
    'slug: "../private"',
    '---',
    'Body',
  ].join('\n');
  assert.throws(() => parsePost(unsafe, 'unsafe.md'), /slug/);
});

test('loadPosts excludes drafts and sorts published posts newest first', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'mhdimo-blog-'));
  temporaryDirectories.push(directory);
  await writeFile(join(directory, 'older.md'), [
    '---',
    'title: "Older post"',
    'date: "2026-01-01"',
    'description: "Older"',
    '---',
    'Older body',
  ].join('\n'));
  await writeFile(join(directory, 'newer.md'), [
    '---',
    'title: "Newer post"',
    'date: "2026-08-31"',
    'description: "Newer"',
    '---',
    'Newer body',
  ].join('\n'));
  await writeFile(join(directory, 'draft.md'), [
    '---',
    'title: "Draft post"',
    'date: "2026-12-31"',
    'description: "Draft"',
    'draft: true',
    '---',
    'Draft body',
  ].join('\n'));

  const posts = await loadPosts(directory);

  assert.deepEqual(posts.map(post => post.slug), ['newer', 'older']);
});

test('loadPosts supports folder bundles and rewrites relative images to semantic figures', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'mhdimo-blog-folders-'));
  temporaryDirectories.push(directory);
  const bundleDir = join(directory, 'my-bundled-post');
  await mkdir(bundleDir);
  await writeFile(join(bundleDir, 'index.md'), [
    '---',
    'title: "Bundled post"',
    'date: "2026-08-31"',
    'description: "A post in a folder"',
    '---',
    '![Benchmark diagram](./benchmark.png)',
  ].join('\n'));

  const posts = await loadPosts(directory);
  assert.equal(posts.length, 1);
  assert.equal(posts[0].slug, 'my-bundled-post');
  assert.match(posts[0].html, /<img\s+[^>]*src="\/blog\/my-bundled-post\/benchmark\.png"/);
  assert.match(posts[0].html, /<figcaption>Benchmark diagram<\/figcaption>/);
});
