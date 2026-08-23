
import React, { useState, useEffect } from 'react';
import { GithubRepo } from '../types';
import { GITHUB_USERNAME, FEATURED_REPOS, REPO_FALLBACKS } from '../constants';

const GithubProjects: React.FC = () => {
  // Start from static fallback data so the cards are present in the
  // server-rendered HTML (and visible before the GitHub API responds).
  const [repos, setRepos] = useState<GithubRepo[]>(REPO_FALLBACKS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        // Fetch specific repos from FEATURED_REPOS list
        const repoPromises = FEATURED_REPOS.map(repoName =>
          fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}`)
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
      <p className="text-xs uppercase tracking-[0.3em] font-bold opacity-30">Loading Repository Buffer...</p>
    </div>
  );

  if (error && repos.length === 0) return (
    <div className="py-16 text-red-500">
      <p className="text-xs uppercase tracking-[0.3em] font-bold">Error: {error}</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {repos.map((repo) => (
        <a
          key={repo.id}
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-white dark:bg-black p-10 group border border-black/5 dark:border-white/5 rounded-2xl hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="flex justify-between items-start mb-5">
            <h3 className="text-xl font-bold tracking-tight truncate pr-4">{repo.name}</h3>
            <span className="text-xs font-bold opacity-30">★ {repo.stargazers_count}</span>
          </div>
          <p className="text-base mb-10 h-12 overflow-hidden line-clamp-2 opacity-60 font-normal leading-relaxed">
            {repo.description || "System architecture repository."}
          </p>
          <div className="flex justify-end items-center text-[10px] uppercase tracking-widest font-black">
            <span className="group-hover:translate-x-2 transition-transform">Details →</span>
          </div>
        </a>
      ))}
    </div>
  );
};

export default GithubProjects;
