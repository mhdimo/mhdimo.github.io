import React, { useState, useEffect } from 'react';
import { GithubRepo } from '../types';
import { FEATURED_REPOS, REPO_FALLBACKS } from '../constants';

const GithubProjects: React.FC = () => {
  // Start from static fallback data so the cards are present in the
  // server-rendered HTML (and visible before the GitHub API responds).
  const [repos, setRepos] = useState<GithubRepo[]>(REPO_FALLBACKS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        // Fetch specific repos from FEATURED_REPOS list (owner/repo)
        const repoPromises = FEATURED_REPOS.map(fullName =>
          fetch(`https://api.github.com/repos/${fullName}`)
        );
        const responses = await Promise.all(repoPromises);
        const data = await Promise.all(
          responses.map(async (res, idx) => {
            if (!res.ok) {
              console.warn(`Failed to fetch repo: ${FEATURED_REPOS[idx]}`);
              return null;
            }
            return res.json();
          })
        );
        const live = data.filter((repo): repo is GithubRepo => repo !== null);
        if (live.length > 0) {
          // Merge live results onto the fallbacks by repo name so a partial
          // API failure (rate limit, renamed repo) never drops existing cards.
          setRepos(prev => {
            const liveNames = new Set(live.map(r => r.name));
            return [...live, ...prev.filter(fb => !liveNames.has(fb.name))];
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  // Only show loading/error states when there is no static fallback content.
  if (loading && repos.length === 0) return (
    <div className="py-16 animate-pulse">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">Loading repositories…</p>
    </div>
  );

  if (error && repos.length === 0) return (
    <div className="py-16 text-accent">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em]">Error: {error}</p>
    </div>
  );

  // Most-starred first.
  const sorted = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {sorted.map((repo) => (
        <a
          key={repo.id}
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col border border-line hover:border-accentline rounded-[4px] p-7 md:p-8 transition-all duration-200 transform hover:-translate-y-0.5"
        >
          <div className="flex justify-between items-start gap-4 mb-4">
            <h3 className="font-mono font-bold tracking-tight text-base truncate">
              {repo.name}
              <span aria-hidden="true" className="text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200"> ↗</span>
            </h3>
          </div>
          <p className="text-[15px] leading-relaxed opacity-70 line-clamp-3 flex-1">
            {repo.description || "System architecture repository."}
          </p>
          <div className="mt-6 flex justify-between items-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            <span className="flex items-center gap-2">
              <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
              {repo.language}
            </span>
            <span>★ {repo.stargazers_count}</span>
          </div>
        </a>
      ))}
    </div>
  );
};

export default GithubProjects;
