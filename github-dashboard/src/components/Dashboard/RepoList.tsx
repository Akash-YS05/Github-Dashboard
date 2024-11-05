interface Repo {
    id: number;
    name: string;
    stargazers_count: number;
    forks: number;
    open_issues_count: number;
  }
  
  const RepoList = ({ repos }: { repos: Repo[] }) => (
    <div className="grid gap-4">
      {repos?.map(repo => (
        <div key={repo.id} className="p-4 bg-slate-200 rounded-lg shadow">
          <h3 className="font-bold">{repo.name}</h3>
          <div className="flex gap-4 mt-2">
            <span>⭐ {repo.stargazers_count}</span>
            <span>🔀 {repo.forks}</span>
            <span>⚠️ {repo.open_issues_count}</span>
          </div>
        </div>
      ))}
    </div>
  );

  export default RepoList