import { useState, useEffect, useCallback } from 'react';

function Projects() {
  const [username, setUsername] = useState('octocat');
  const [searchInput, setSearchInput] = useState('octocat');
  const [searchTerm, setSearchTerm] = useState('');

  // ⚡ Performance Optimization: Initialize from sessionStorage cache for instant render
  const [repos, setRepos] = useState(() => {
    const cached = sessionStorage.getItem('github_repos_octocat');
    return cached ? JSON.parse(cached) : [];
  });
  
  const [loading, setLoading] = useState(() => {
    const cached = sessionStorage.getItem('github_repos_octocat');
    return !cached;
  });

  const [error, setError] = useState(null);

  const fetchRepos = useCallback(async (userToFetch = username, force = false) => {
    const cacheKey = `github_repos_${userToFetch}`;
    const cachedData = sessionStorage.getItem(cacheKey);

    // If cached data exists and not forced refresh, show instantly without network delay
    if (cachedData && !force) {
      setRepos(JSON.parse(cachedData));
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.github.com/users/${userToFetch}/repos?sort=updated&per_page=30`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`GitHub user "${userToFetch}" not found.`);
        } else if (response.status === 403) {
          throw new Error('API rate limit exceeded. Please try again later.');
        } else {
          throw new Error(`Failed to fetch repositories (Status: ${response.status})`);
        }
      }

      const data = await response.json();
      sessionStorage.setItem(cacheKey, JSON.stringify(data));
      setRepos(data);
    } catch (err) {
      if (!cachedData) {
        setError(err.message || 'An unexpected error occurred while fetching data.');
      }
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    fetchRepos(username);
  }, [username, fetchRepos]);

  const handleUserSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setUsername(searchInput.trim());
      fetchRepos(searchInput.trim(), true); // Force fetch new user
    }
  };

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (repo.language && repo.language.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <section className="projects-container page-transition">
      <div className="projects-header">
        <h1>GitHub Repositories</h1>
        <p>Live REST API integration fetching public repositories directly from GitHub.</p>
      </div>

      {/* Control Bar: Change Username & Filter Repositories */}
      <div className="api-controls-bar">
        <form onSubmit={handleUserSearch} className="username-form">
          <label htmlFor="github-user-input">GitHub User:</label>
          <div className="input-with-button">
            <input
              id="github-user-input"
              type="text"
              className="form-control"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="e.g. octocat, facebook, google"
            />
            <button type="submit" className="fetch-user-btn">
              Load Repos
            </button>
          </div>
        </form>

        <div className="search-filter-wrapper">
          <label htmlFor="repo-filter-input">Filter Repos:</label>
          <input
            id="repo-filter-input"
            type="text"
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by repo name or language..."
            disabled={loading && repos.length === 0}
          />
        </div>
      </div>

      {/* Conditional Rendering: Loading State */}
      {loading && repos.length === 0 && (
        <div className="loading-state-card card-panel">
          <div className="spinner"></div>
          <p>Fetching repositories for <strong>"{username}"</strong> from GitHub API...</p>
        </div>
      )}

      {/* Conditional Rendering: Error State */}
      {!loading && error && (
        <div className="error-state-card card-panel">
          <h3>Failed to Load Data</h3>
          <p className="error-message">{error}</p>
          <button 
            type="button" 
            onClick={() => fetchRepos(username, true)} 
            className="retry-btn"
          >
            Retry Request
          </button>
        </div>
      )}

      {/* Conditional Rendering: Success / Data State */}
      {(!loading || repos.length > 0) && !error && (
        <>
          <div className="results-summary">
            Showing {filteredRepos.length} of {repos.length} repositories for <strong>@{username}</strong>
          </div>

          {filteredRepos.length === 0 ? (
            <div className="empty-state-card card-panel">
              <p>No repositories found matching "<strong>{searchTerm}</strong>".</p>
            </div>
          ) : (
            <div className="projects-grid">
              {filteredRepos.map((repo) => (
                <div key={repo.id} className="project-card">
                  <div className="card-top-row">
                    <h3>{repo.name}</h3>
                    {repo.stargazers_count !== undefined && (
                      <span className="star-badge" title="Stars">
                        ★ {repo.stargazers_count}
                      </span>
                    )}
                  </div>
                  
                  <p className="project-description">
                    {repo.description || "No description provided for this repository."}
                  </p>
                  
                  <div className="project-tags">
                    {repo.language && (
                      <span className="project-tag language-tag">
                        {repo.language}
                      </span>
                    )}
                    {repo.forks_count !== undefined && (
                      <span className="project-tag fork-tag">
                        {repo.forks_count} forks
                      </span>
                    )}
                  </div>

                  <a 
                    href={repo.html_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="project-link-btn"
                  >
                    View on GitHub →
                  </a>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default Projects;
