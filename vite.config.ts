
import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

function blogDevPlugin(): Plugin {
  return {
    name: 'vite-plugin-blog-dev',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0];
        if (!url || !url.startsWith('/blog')) {
          return next();
        }
        try {
          const { loadPosts, renderIndexHtml, renderPostHtml } = await import('./scripts/blog.mjs');
          const contentDir = resolve(__dirname, 'content/posts');
          const posts = await loadPosts(contentDir);
          const host = req.headers.host || 'localhost:5173';
          const siteUrl = `http://${host}`;

          if (url === '/blog' || url === '/blog/') {
            const html = renderIndexHtml(posts, siteUrl);
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.end(html);
            return;
          }

          const match = url.match(/^\/blog\/([a-z0-9-]+)\/?$/);
          if (match) {
            const slug = match[1];
            const post = posts.find(p => p.slug === slug);
            if (post) {
              const html = renderPostHtml(post, siteUrl);
              res.setHeader('Content-Type', 'text/html; charset=utf-8');
              res.end(html);
              return;
            }
          }

          const assetMatch = url.match(/^\/blog\/([a-z0-9-]+)\/(.+)$/);
          if (assetMatch) {
            const [, slug, assetFile] = assetMatch;
            if (assetFile && assetFile !== 'index.html') {
              const post = posts.find(p => p.slug === slug);
              if (post && post.assetDir) {
                const assetPath = resolve(post.assetDir, assetFile);
                const { existsSync, createReadStream } = await import('node:fs');
                if (existsSync(assetPath)) {
                  const ext = assetFile.split('.').pop()?.toLowerCase();
                  const mimes: Record<string, string> = {
                    png: 'image/png',
                    jpg: 'image/jpeg',
                    jpeg: 'image/jpeg',
                    gif: 'image/gif',
                    svg: 'image/svg+xml',
                    webp: 'image/webp',
                    avif: 'image/avif',
                    mp4: 'video/mp4',
                    pdf: 'application/pdf',
                  };
                  if (ext && mimes[ext]) {
                    res.setHeader('Content-Type', mimes[ext]);
                  }
                  createReadStream(assetPath).pipe(res);
                  return;
                }
              }
            }
          }
          next();
        } catch (err) {
          next(err);
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), blogDevPlugin()],
  base: '/', // Root path for username.github.io sites
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false
  }
});
