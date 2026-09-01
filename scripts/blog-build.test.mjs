import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { buildBlog } from './blog.mjs';

const temporaryDirectories = [];

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map(directory =>
    rm(directory, { recursive: true, force: true }),
  ));
});

test('buildBlog creates index, article, and sitemap entries', async () => {
  const contentDirectory = await mkdtemp(join(tmpdir(), 'mhdimo-blog-content-'));
  const outputDirectory = await mkdtemp(join(tmpdir(), 'mhdimo-blog-output-'));
  temporaryDirectories.push(contentDirectory, outputDirectory);

  await writeFile(join(contentDirectory, 'newer.md'), [
    '---',
    'title: "Newer post"',
    'date: "2026-08-31"',
    'description: "A newer post."',
    '---',
    '# Newer post',
    '',
    'Body.',
  ].join('\n'));
  await writeFile(join(outputDirectory, 'sitemap.xml'), [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    '<url><loc>https://example.test/</loc></url>',
    '</urlset>',
  ].join('\n'));

  await buildBlog({
    contentDir: contentDirectory,
    outDir: outputDirectory,
    siteUrl: 'https://example.test',
  });

  assert.match(await readFile(join(outputDirectory, 'blog/index.html'), 'utf8'), /Writing/);
  assert.match(await readFile(join(outputDirectory, 'blog/newer/index.html'), 'utf8'), /Newer post/);
  assert.match(await readFile(join(outputDirectory, 'sitemap.xml'), 'utf8'), /https:\/\/example\.test\/blog\/newer\//);
});
