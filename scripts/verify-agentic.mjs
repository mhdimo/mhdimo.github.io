/**
 * Verify the machine-readable, agent-facing contract of the built site.
 * Runs against dist/ after `bun run build`. Exits non-zero on any failure.
 *
 * Covers the checks the is-agentic.com audit performs on this site:
 * content in raw HTML, agent-friendly 404, JSON-LD (Person/WebSite/
 * Organization), llms.txt, sitemap, robots, metadata, trust anchors.
 *
 * Usage: bun scripts/verify-agentic.mjs  (or: bun run test:agentic)
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';

const DIST = resolve(import.meta.dirname, '../dist');
const failures = [];
let checks = 0;

function check(name, ok, detail) {
  checks++;
  const status = ok ? 'PASS' : 'FAIL';
  console.log(`  ${status}  ${name}${detail ? ` — ${detail}` : ''}`);
  if (!ok) failures.push(name);
}

function read(p) {
  return readFileSync(resolve(DIST, p), 'utf-8');
}

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

console.log('Agentic contract verification (dist/):');

// --- content-no-js (essential) ---
const html = read('index.html');
const text = visibleText(html);
check('raw HTML has exactly one <h1>', (html.match(/<h1/g) || []).length === 1, `count=${(html.match(/<h1/g) || []).length}`);
check('raw HTML has 500+ chars of text', text.length >= 500, `chars=${text.length}`);
const FEATURED = ['ai-sdk-cpp', 'deepseek-code', 'vllm-metal', 'Zellia80-HE'];
check('raw HTML shows all 4 featured projects', FEATURED.every(name => html.includes(name)), `missing=${FEATURED.filter(n => !html.includes(n)).join(',') || 'none'}`);
// Star-descending fallback order: vllm-metal 1631 > ai-sdk-cpp 31 > Zellia80-HE 24 > deepseek-code 5
const STAR_ORDER = ['vllm-metal', 'ai-sdk-cpp', 'Zellia80-HE', 'deepseek-code'];
const orderIdx = STAR_ORDER.map(n => html.indexOf(n));
const starOrder = orderIdx.every((v, i) => v >= 0 && (i === 0 || v > orderIdx[i - 1]));
check('projects ordered by stars (SSR order)', starOrder, `order=${STAR_ORDER.map((n, i) => `${n}@${orderIdx[i]}`).join(' ')}`);
// Round-4 redesign removed project logos (user decision); the cards must stay
// text-only. Scope to the projects section — the vLLM avatar legitimately
// appears in the Experience section as a company logo.
const projectsHtml = html.slice(html.indexOf('id="projects"'));
check('project cards are text-only (no images)', !/<img/.test(projectsHtml), 'logos removed per redesign');
// Experience entries carry their company's brand mark (vLLM, Amazon, KBDfans).
// Company logos are hosted locally (external signed CDN URLs get blocked in
// browsers); vLLM's org avatar is a stable GitHub CDN asset.
const LOGO_URLS = [
  'avatars.githubusercontent.com/u/136984999',      // vLLM bolt
  '/images/amazon-logo.jpg',
  '/images/kbdfans-logo.png',
];
check('experience company logos shipped', LOGO_URLS.every(u => html.includes(u)), `missing=${LOGO_URLS.filter(u => !html.includes(u)).join(',') || 'none'}`);
check('company logo files exist in dist', existsSync(resolve(DIST, 'images/amazon-logo.jpg')) && existsSync(resolve(DIST, 'images/kbdfans-logo.png')), 'local logo assets');
check('no git-branch decoration left over', !html.includes('git-branch-icon'), 'branches removed');

// --- agent-friendly 404 (essential) ---
const notFound = read('404.html');
check('404.html exists with recovery links', /\[Site map\]\(https:\/\/mhdimo\.github\.io\/sitemap\.xml\)/.test(notFound) && /llms\.txt/.test(notFound), 'markdown links to sitemap + llms.txt');
// The markdown recovery block lives inside <pre> so its formatting is
// preserved verbatim for parsers; assert its exact content.
const mdBlock = notFound.match(/<pre>([\s\S]*?)<\/pre>/)?.[1] ?? '';
check('404.html markdown block has heading + links', /# 404/.test(mdBlock) && /- \[[^\]]+\]\(https:\/\/mhdimo\.github\.io\/[^)]+\)/.test(mdBlock) && /llms\.txt/.test(mdBlock), 'markdown heading + links in body');

// --- JSON-LD (recommended) ---
const ldBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
const types = ldBlocks.map(b => b['@type']);
check('JSON-LD parses (3 blocks)', ldBlocks.length === 3, `types=${types.join(', ')}`);
const person = ldBlocks.find(b => b['@type'] === 'Person');
check('Person has contactPoint + email', !!person?.contactPoint?.email && !!person?.contactPoint?.contactType);
// Brand entity: the mhdimo handle is mapped to the Person so search engines
// associate the profile name with this domain (brand-name discoverability).
check('Person has alternateName mhdimo', person?.alternateName === 'mhdimo');
check('Person has knowsAbout topics', Array.isArray(person?.knowsAbout) && person.knowsAbout.length >= 3);
check('Person has address', person?.address?.addressLocality === 'Berlin');
check('Person has sameAs', Array.isArray(person?.sameAs) && person.sameAs.length >= 3);
const organization = ldBlocks.find(b => b['@type'] === 'Organization');
check('Organization has contactPoint + email', !!organization?.contactPoint?.email && !!organization?.contactPoint?.contactType);
check('Organization has PostalAddress', organization?.address?.['@type'] === 'PostalAddress' && !!organization?.address?.addressLocality);
const website = ldBlocks.find(b => b['@type'] === 'WebSite');
check('WebSite present with publisher', !!website?.url && !!website?.publisher);

// --- llms.txt + when-to-use (recommended) ---
const llms = read('llms.txt');
check('llms.txt exists', llms.length > 0);
check('llms.txt has when-to-use guidance', /when to use/i.test(llms), 'section present');
check('llms.txt links to llms-full.txt', llms.includes('llms-full.txt'), 'full-content variant discoverable');

// --- llms-full.txt (llmstxt.org full-content variant) ---
const llmsFull = read('llms-full.txt');
check('llms-full.txt exists with full content', llmsFull.length >= 800, `chars=${llmsFull.length}`);
check('llms-full.txt has experience + education + projects', /## Experience/.test(llmsFull) && /## Education/.test(llmsFull) && /## Projects/.test(llmsFull));

// --- user requirement: no phone number anywhere in agent-facing content ---
// Guard against the number itself and machine-readable phone fields, not the
// word "phone" (the site intentionally states "no phone number is published").
const noPhoneSources = [html, llms, llmsFull, notFound, read('contact/index.html'), read('about/index.html')];
check('no phone number / tel link / telephone field', !noPhoneSources.some(s => /tel:\+?[0-9]|"telephone"\s*:|"phoneNumber"\s*:|\b\+[0-9]{7,}/i.test(s)), 'privacy requirement');

// --- sitemap (recommended) ---
const sitemap = read('sitemap.xml');
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
check('sitemap.xml lists home + 3 anchors', ['https://mhdimo.github.io/', '/about/', '/contact/', '/privacy/'].every(u => locs.some(l => l.endsWith(u))), `urls=${locs.length}`);

// --- robots.txt ---
const robots = read('robots.txt');
check('robots.txt allows and points to sitemap', /^Allow: \/$/m.test(robots) && /Sitemap: https:\/\/mhdimo\.github\.io\/sitemap\.xml/.test(robots));

// --- metadata (recommended) ---
check('canonical link present', html.includes('rel="canonical" href="https://mhdimo.github.io/"'));
check('og:image present + file exists', html.includes('og:image') && existsSync(resolve(DIST, 'og-image.png')));
check('og:type + html lang', html.includes('property="og:type"') && /<html lang="en"/.test(html));

// --- trust anchors (recommended) ---
for (const page of ['about', 'contact', 'privacy']) {
  const p = read(`${page}/index.html`);
  check(`${page}/ has 500+ chars`, visibleText(p).length >= 500, `chars=${visibleText(p).length}`);
}
// Brand entity on the About page: Person mainEntity mirrors sameAs/alternateName.
const aboutPage = JSON.parse(read('about/index.html').match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
check('about/ Person mainEntity has sameAs + alternateName', aboutPage?.mainEntity?.alternateName === 'mhdimo' && Array.isArray(aboutPage?.mainEntity?.sameAs) && aboutPage.mainEntity.sameAs.length >= 3);

// --- well-known agent skill (agentskills.io discovery 0.2.0) ---
const skillIndex = JSON.parse(read('.well-known/agent-skills/index.json'));
check('agent-skills index uses discovery schema', skillIndex['$schema'] === 'https://schemas.agentskills.io/discovery/0.2.0/schema.json');
const skill = skillIndex.skills?.[0];
check('agent-skills index lists skill-md entry', skill?.name === 'mihal-dimo' && skill?.type === 'skill-md');
check('agent-skills index URL is on this domain', skill?.url === 'https://mhdimo.github.io/.well-known/agent-skills/mihal-dimo/SKILL.md');
const skillMd = read('.well-known/agent-skills/mihal-dimo/SKILL.md');
const skillDigest = `sha256:${createHash('sha256').update(skillMd).digest('hex')}`;
check('agent-skills digest matches SKILL.md', skillDigest === skill?.digest);
check('SKILL.md has frontmatter + llms.txt guidance', skillMd.startsWith('---') && /^description:/m.test(skillMd) && skillMd.includes('/llms.txt'));

// --- security.txt (RFC 9116) ---
const security = read('.well-known/security.txt');
check('security.txt has Contact + Expires', /^Contact: mailto:.+$/m.test(security) && /^Expires: 20\d{2}-/m.test(security), 'RFC 9116 fields');
const expires = security.match(/^Expires: (.+)$/m)?.[1];
check('security.txt expiry is in the future', !!expires && new Date(expires) > new Date());

console.log('');
if (failures.length > 0) {
  console.error(`✗ ${failures.length}/${checks} agentic checks FAILED: ${failures.join(', ')}`);
  process.exit(1);
}
console.log(`✓ all ${checks} agentic checks passed`);
