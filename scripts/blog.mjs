import { cp, readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, basename } from 'node:path';
import { marked } from 'marked';
import hljs from 'highlight.js';

// Configure marked with GFM, syntax highlighting, and semantic figures
marked.use({
  gfm: true,
  breaks: false,
  renderer: {
    code({ text, lang }) {
      const validLang = lang && hljs.getLanguage(lang) ? lang : null;
      const highlighted = validLang ? hljs.highlight(text, { language: validLang }).value : escapeHtml(text);
      const langClass = validLang ? `language-${validLang}` : (lang ? `language-${escapeHtml(lang)}` : '');
      return `<pre><code${langClass ? ` class="${langClass}"` : ''}>${highlighted}</code></pre>\n`;
    },
    image({ href, title, text }) {
      const src = href || '';
      const alt = text ? escapeHtml(text) : '';
      const titleAttr = title ? ` title="${escapeHtml(title)}"` : '';
      if (alt) {
        return `<figure><img src="${src}" alt="${alt}"${titleAttr} loading="lazy" decoding="async"><figcaption>${alt}</figcaption></figure>`;
      }
      return `<img src="${src}" alt=""${titleAttr} loading="lazy" decoding="async">`;
    },
  },
});

/**
 * Escape HTML special characters
 */
function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Parse frontmatter and content from markdown source
 */
export function parsePost(source, filename = 'post.md') {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;
  const match = source.match(frontmatterRegex);

  if (!match) {
    throw new Error(`Invalid post format in ${filename}: Missing frontmatter delimiters (---)`);
  }

  const rawMeta = match[1];
  const markdownBody = match[2];

  const meta = {};
  for (const line of rawMeta.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const colonIdx = trimmed.indexOf(':');
    if (colonIdx === -1) continue;

    const key = trimmed.slice(0, colonIdx).trim();
    let val = trimmed.slice(colonIdx + 1).trim();

    if (val.startsWith('"') && val.endsWith('"')) {
      val = val.slice(1, -1);
    } else if (val.startsWith("'") && val.endsWith("'")) {
      val = val.slice(1, -1);
    } else if (val === 'true') {
      val = true;
    } else if (val === 'false') {
      val = false;
    } else if (val.startsWith('[') && val.endsWith(']')) {
      try {
        val = JSON.parse(val);
      } catch {
        // Fallback for simple comma separated array
        val = val.slice(1, -1).split(',').map(s => s.trim().replace(/^['"]|['"]$/g, ''));
      }
    }
    meta[key] = val;
  }

  if (!meta.title) {
    throw new Error(`Missing required field: title in ${filename}`);
  }
  if (!meta.date) {
    throw new Error(`Missing required field: date in ${filename}`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(meta.date))) {
    throw new Error(`Invalid date format (must be YYYY-MM-DD) in ${filename}`);
  }
  if (!meta.description) {
    throw new Error(`Missing required field: description in ${filename}`);
  }

  const baseSlug = basename(filename, '.md');
  const slug = meta.slug ? String(meta.slug) : baseSlug;

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(`Invalid slug "${slug}" in ${filename}: must contain only lowercase letters, numbers, and single hyphens.`);
  }

  const tags = Array.isArray(meta.tags) ? meta.tags : [];
  const draft = Boolean(meta.draft);

  let bodyForRendering = markdownBody.trim();
  const leadingH1 = bodyForRendering.match(/^#\s+([^\r\n]+)\r?\n*/);
  if (leadingH1 && leadingH1[1].trim().toLowerCase() === meta.title.trim().toLowerCase()) {
    bodyForRendering = bodyForRendering.slice(leadingH1[0].length);
  }

  let html = marked.parse(bodyForRendering);
  // Rewrite relative image src (e.g. ./image.png or image.png) to /blog/${slug}/image.png
  html = html.replace(
    /(<img\s+[^>]*?src=")(?:\.\/)?([^"/:][^"]*)(")/g,
    `$1/blog/${slug}/$2$3`
  );

  return {
    title: meta.title,
    date: String(meta.date),
    description: meta.description,
    slug,
    tags,
    draft,
    markdown: markdownBody,
    html,
  };
}

/**
 * Load all published posts from a content directory, sorted newest first.
 * Supports both standalone markdown files (.md) and folder bundles with index.md.
 */
export async function loadPosts(contentDir) {
  const entries = await readdir(contentDir, { withFileTypes: true });
  const posts = [];

  for (const entry of entries) {
    if (entry.isFile() && entry.name.endsWith('.md')) {
      const filePath = join(contentDir, entry.name);
      const content = await readFile(filePath, 'utf-8');
      const post = parsePost(content, entry.name);
      if (!post.draft) {
        posts.push(post);
      }
    } else if (entry.isDirectory()) {
      const postFolder = join(contentDir, entry.name);
      const indexMd = join(postFolder, 'index.md');
      const namedMd = join(postFolder, `${entry.name}.md`);
      let mdPath = null;
      if (existsSync(indexMd)) {
        mdPath = indexMd;
      } else if (existsSync(namedMd)) {
        mdPath = namedMd;
      }

      if (mdPath) {
        const content = await readFile(mdPath, 'utf-8');
        const post = parsePost(content, `${entry.name}.md`);
        post.assetDir = postFolder;
        if (!post.draft) {
          posts.push(post);
        }
      }
    }
  }

  // Sort descending by date, then title
  posts.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
  return posts;
}

/**
 * Render Markdown content to HTML
 */
export function renderMarkdown(markdown) {
  return marked.parse(markdown);
}

/**
 * Format a YYYY-MM-DD date string nicely (e.g. "Aug 31, 2026")
 */
function formatDate(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.toLocaleDateString('en-US', {
    timeZone: 'UTC',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * HTML Shell template
 */
function renderShell({ title, description, canonicalUrl, ogType = 'website', jsonLd, bodyContent }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${escapeHtml(canonicalUrl)}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:type" content="${ogType}">
  <meta property="og:url" content="${escapeHtml(canonicalUrl)}">
  <meta property="og:image" content="https://mhdimo.github.io/og-image.png">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="stylesheet" href="/blog.css">
  <script>
    (function() {
      var saved = localStorage.getItem('theme');
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (saved === 'dark' || (!saved && prefersDark)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    })();
  </script>
  ${jsonLd ? `<script type="application/ld+json">\n  ${JSON.stringify(jsonLd, null, 2)}\n  </script>` : ''}
</head>
<body>
  <header class="site-header">
    <div class="header-inner">
      <a href="/" class="brand">Mihal <span class="dim">Dimo</span></a>
      <nav class="nav-links">
        <a href="/">Home</a>
        <a href="/#work">Experience</a>
        <a href="/#projects">Projects</a>
        <a href="/blog/" class="active">Blog</a>
      </nav>
      <div class="header-actions">
        <button id="theme-toggle" aria-label="Toggle theme" class="theme-toggle-btn">
          <svg class="sun-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
          <svg class="moon-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
        </button>
      </div>
    </div>
  </header>

  <main class="page-container">
${bodyContent}
  </main>

  <footer class="site-footer">
    <div class="footer-inner">
      <p>© 2026 Mihal Dimo</p>
      <div class="footer-links">
        <a href="/">Home</a>
        <a href="/blog/">Writing</a>
        <a href="/about/">About</a>
        <a href="/contact/">Contact</a>
        <a href="/privacy/">Privacy</a>
        <a href="https://github.com/mhdimo" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://linkedin.com/in/mihaldimo/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
    </div>
  </footer>

  <script>
    document.getElementById('theme-toggle')?.addEventListener('click', function() {
      var isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  </script>
</body>
</html>`;
}

/**
 * Generate HTML for Blog Index
 */
export function renderIndexHtml(posts, siteUrl) {
  const postItems = posts.map(post => `
      <article class="post-card">
        <div class="post-card-meta">
          <time datetime="${post.date}">${formatDate(post.date)}</time>
          ${post.tags.length > 0 ? `<span class="tags">${post.tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}</span>` : ''}
        </div>
        <h2 class="post-card-title"><a href="/blog/${post.slug}/">${escapeHtml(post.title)}</a></h2>
        <p class="post-card-desc">${escapeHtml(post.description)}</p>
      </article>`).join('\n');

  const bodyContent = `    <div class="blog-index-header">
      <p class="section-label">Writing</p>
      <h1 class="page-title">Articles & Notes</h1>
      <p class="page-subtitle">Deep dives on LLM inference systems, speculative decoding, kernel optimization, and embedded engineering.</p>
    </div>

    <div class="posts-list">
      ${posts.length > 0 ? postItems : '<p class="no-posts">No published posts yet.</p>'}
    </div>`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Mihal Dimo — Blog',
    description: 'Deep dives on LLM inference systems, speculative decoding, kernel optimization, and embedded engineering.',
    url: `${siteUrl}/blog/`,
    author: {
      '@type': 'Person',
      name: 'Mihal Dimo',
      url: `${siteUrl}/`,
    },
    blogPost: posts.map(post => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      url: `${siteUrl}/blog/${post.slug}/`,
    })),
  };

  return renderShell({
    title: 'Writing | Mihal Dimo',
    description: 'Articles and notes on LLM inference systems, speculative decoding, kernel optimization, and embedded engineering.',
    canonicalUrl: `${siteUrl}/blog/`,
    ogType: 'website',
    jsonLd,
    bodyContent,
  });
}

/**
 * Generate HTML for an individual blog post
 */
export function renderPostHtml(post, siteUrl) {
  const canonicalUrl = `${siteUrl}/blog/${post.slug}/`;

  const bodyContent = `    <article class="post-article">
      <header class="post-header">
        <div class="post-meta">
          <a href="/blog/" class="back-link">← Writing</a>
          <span class="meta-separator">·</span>
          <time datetime="${post.date}">${formatDate(post.date)}</time>
          ${post.tags.length > 0 ? `<span class="tags">${post.tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}</span>` : ''}
        </div>
        <h1 class="post-title">${escapeHtml(post.title)}</h1>
        <p class="post-lead">${escapeHtml(post.description)}</p>
      </header>

      <div class="post-content markdown-body">
        ${post.html}
      </div>

      <footer class="post-footer">
        <div class="post-nav">
          <a href="/blog/" class="back-link">← Back to all articles</a>
        </div>
      </footer>
    </article>`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    author: {
      '@type': 'Person',
      name: 'Mihal Dimo',
      url: `${siteUrl}/`,
    },
  };

  return renderShell({
    title: `${post.title} | Mihal Dimo`,
    description: post.description,
    canonicalUrl,
    ogType: 'article',
    jsonLd,
    bodyContent,
  });
}

/**
 * Update sitemap.xml to include blog index and blog posts
 */
async function updateSitemap(sitemapPath, posts, siteUrl) {
  if (!existsSync(sitemapPath)) return;
  let sitemap = await readFile(sitemapPath, 'utf-8');

  const urlsToAdd = [
    `${siteUrl}/blog/`,
    ...posts.map(p => `${siteUrl}/blog/${p.slug}/`),
  ];

  for (const url of urlsToAdd) {
    if (!sitemap.includes(`<loc>${url}</loc>`)) {
      const entry = `  <url>\n    <loc>${url}</loc>\n  </url>\n`;
      sitemap = sitemap.replace('</urlset>', `${entry}</urlset>`);
    }
  }

  await writeFile(sitemapPath, sitemap, 'utf-8');
}

/**
 * Main buildBlog function
 */
export async function buildBlog({
  contentDir,
  outDir,
  siteUrl = 'https://mhdimo.github.io',
}) {
  const posts = await loadPosts(contentDir);

  const blogOutDir = join(outDir, 'blog');
  await mkdir(blogOutDir, { recursive: true });

  // 1. Build blog/index.html
  const indexHtml = renderIndexHtml(posts, siteUrl);
  await writeFile(join(blogOutDir, 'index.html'), indexHtml, 'utf-8');

  // 2. Build blog/<slug>/index.html
  for (const post of posts) {
    const postDir = join(blogOutDir, post.slug);
    await mkdir(postDir, { recursive: true });
    const postHtml = renderPostHtml(post, siteUrl);
    await writeFile(join(postDir, 'index.html'), postHtml, 'utf-8');

    // Copy any co-located assets (images, SVGs, etc.) from post folder
    if (post.assetDir && existsSync(post.assetDir)) {
      const folderEntries = await readdir(post.assetDir);
      for (const item of folderEntries) {
        if (item === 'index.md' || item.endsWith('.md')) continue;
        const srcPath = join(post.assetDir, item);
        const destPath = join(postDir, item);
        await cp(srcPath, destPath, { recursive: true });
      }
    }
  }

  // 3. Update sitemap.xml in outDir
  const sitemapPath = join(outDir, 'sitemap.xml');
  await updateSitemap(sitemapPath, posts, siteUrl);

  console.log(`[blog] generated ${posts.length} posts, index, and sitemap entries`);
}
