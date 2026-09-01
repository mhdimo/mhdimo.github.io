import { resolve } from 'node:path';
import { buildBlog } from './blog.mjs';

const contentDir = resolve(import.meta.dirname, '../content/posts');
const outDir = resolve(import.meta.dirname, '../dist');
const siteUrl = 'https://mhdimo.github.io';

await buildBlog({ contentDir, outDir, siteUrl });
