/**
 * Prerender the app into dist/index.html so AI crawlers (and no-JS visitors)
 * see the real content in raw HTML instead of an empty #root.
 *
 * Run after `vite build`: injects server-rendered markup into the built
 * index.html. The browser then hydrates the same tree client-side.
 *
 * Usage: bun scripts/prerender.tsx
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { renderToString } from 'react-dom/server';
import React from 'react';
import App from '../App';

// Resolve relative to this file so the script works from any working directory.
const DIST_INDEX = fileURLToPath(new URL('../dist/index.html', import.meta.url));

const html = readFileSync(DIST_INDEX, 'utf-8');
const appHtml = renderToString(React.createElement(App));

const withPrerender = html.replace(
  '<div id="root"></div>',
  `<div id="root">${appHtml}</div>`,
);

if (withPrerender === html) {
  throw new Error('Prerender failed: could not find <div id="root"></div> in dist/index.html');
}

writeFileSync(DIST_INDEX, withPrerender);

// Report the amount of raw text now visible to crawlers (for the
// "Content without JavaScript" check: H1 + 500+ chars of text).
const text = withPrerender
  .replace(/<script[\s\S]*?<\/script>/g, ' ')
  .replace(/<style[\s\S]*?<\/style>/g, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

console.log(`[prerender] injected ${appHtml.length} chars of markup; ${text.length} chars of visible text`);
