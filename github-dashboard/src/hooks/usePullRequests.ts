// hooks/usePullRequests.ts
import { useState, useEffect } from 'react';

interface PullRequest {
  number: number;
  state: 'open' | 'closed';
  created_at: string;
  closed_at: string | null;
  merged_at: string | null;
  user: {
    login: string;
  };
}

interface ProcessedPRData {
  date: string;
  count: number;
  open: number;
  closed: number;
  merged: number;
}

export const usePullRequests = (repo: string) => {
  const [data, setData] = useState<ProcessedPRData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const org = localStorage.getItem('orgName');

  useEffect(() => {
    const fetchPRs = async () => {
      if (!repo || !org) return;
      
      try {
        setLoading(true);
        // Fetch PRs for the last 6 months
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        
        const response = await fetch(
          `https://api.github.com/repos/${org}/${repo}/pulls?state=all&per_page=100&sort=created&direction=desc`,
          {
            headers: {
              'Accept': 'application/vnd.github.v3+json'
            }
          }
        );

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }

        const prs: PullRequest[] = await response.json();

        // Process PRs by month
        const prsByMonth = prs.reduce((acc: { [key: string]: ProcessedPRData }, pr) => {
          const date = new Date(pr.created_at);
          const monthKey = date.toLocaleString('default', { month: 'short', year: 'numeric' });
          
          if (!acc[monthKey]) {
            acc[monthKey] = {
              date: monthKey,
              count: 0,
              open: 0,
              closed: 0,
              merged: 0
            };
          }
          
          acc[monthKey].count++;
          
          if (pr.merged_at) {
            acc[monthKey].merged++;
          } else if (pr.state === 'closed') {
            acc[monthKey].closed++;
          } else {
            acc[monthKey].open++;
          }
          
          return acc;
        }, {});

        // Convert to array and sort by date
        const sortedData = Object.values(prsByMonth).sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateA.getTime() - dateB.getTime();
        });

        setData(sortedData);
        setError(null);
      } catch (err) {
        console.error('Error fetching pull requests:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch pull requests'));
      } finally {
        setLoading(false);
      }
    };

    fetchPRs();
  }, [repo, org]);

  // Calculate some useful statistics
  const stats = {
    totalPRs: data.reduce((sum, month) => sum + month.count, 0),
    openPRs: data.reduce((sum, month) => sum + month.open, 0),
    mergeRate: data.length > 0 
      ? (data.reduce((sum, month) => sum + month.merged, 0) / 
         data.reduce((sum, month) => sum + month.count, 0) * 100).toFixed(1)
      : 0,
    trend: data.length >= 2 
      ? ((data[data.length - 1]?.count || 0) - (data[data.length - 2]?.count || 0))
      : 0
  };

  return {
    data,
    loading,
    error,
    stats,
    refresh: () => {
      setLoading(true);
      setError(null);
      // This will trigger the useEffect
    }
  };
};



// // hooks/usePullRequests.ts
// import { useState, useEffect } from 'react';
// import { getPullRequests } from '../services/github';

// interface PullRequest {
//   created_at: string;
//   state: string;
//   // Add other fields you need from GitHub's PR object
// }

// export const usePullRequests = (repo: string) => {
//   const [data, setData] = useState<{ date: string; count: number }[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const prs: PullRequest[] = await getPullRequests(repo);
        
//         // Group PRs by month
//         const prsByMonth = prs.reduce((acc, pr) => {
//           const date = new Date(pr.created_at);
//           const monthKey = date.toLocaleString('default', { month: 'short' });
          
//           acc[monthKey] = (acc[monthKey] || 0) + 1;
//           return acc;
//         }, {} as Record<string, number>);

//         // Transform into chart data format
//         const chartData = Object.entries(prsByMonth)
//           .map(([date, count]) => ({ date, count }))
//           .sort((a, b) => {
//             // Sort by month
//             const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
//                           'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//             return months.indexOf(a.date) - months.indexOf(b.date);
//           });

//         setData(chartData);
//       } catch (err) {
//         setError(err instanceof Error ? err : new Error('Failed to fetch PRs'));
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (repo) {
//       fetchData();
//     }
//   }, [repo]);

//   return { data, loading, error };
// };