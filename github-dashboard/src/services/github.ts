const BASE_URL = "https://api.github.com";

export const getRepositories = async (org: string) => {
    const response = await fetch(`${BASE_URL}/orgs/${org}/repos`);
    if (!response.ok) throw new Error("Couldn't fetch repo. ");
    return response.json();
}

export const fetchPullRequests = async (org: string, repo: string) => {
    const response = await fetch(
      `${BASE_URL}/repos/${org}/${repo}/pulls`
    );
    return response.json();
  };

// export const getPullRequests = async (repo: string) => {
//     const org = localStorage.getItem('orgName');
//     const response = await fetch(`/repos/${org}/${repo}/pulls`);
//     return response.json();
//   };

// services/github.ts

// export const getPullRequests = async (repo: string) => {
//     const org = localStorage.getItem('orgName');
    
//     if (!org || !repo) {
//       throw new Error('Organization or repository name is missing');
//     }
  
//     try {
//       const response = await fetch(`https://api.github.com/orgs/${org}/${repo}/pulls?state=all&per_page=100`, {
//         headers: {
//           'Accept': 'application/vnd.github.v3+json'
//         }
//       });
  
//       if (!response.ok) {
//         // Check for rate limit errors specifically
//         if (response.status === 403) {
//           throw new Error('GitHub API rate limit exceeded. Please try again later.');
//         }
//         const errorText = await response.text();
//         throw new Error(`GitHub API error: ${response.status} ${errorText}`);
//       }
  
//       return await response.json();
//     } catch (error) {
//       if (error instanceof Error) {
//         // If it's an API rate limit error, throw that specifically
//         if (error.message.includes('rate limit')) {
//           throw error;
//         }
//         // For other errors, give a more user-friendly message
//         throw new Error(`Failed to fetch pull requests: ${error.message}`);
//       }
//       throw error;
//     }
//   };
  
//   // Add a function to test if the API is accessible
//   export const testGitHubAPI = async (org: string) => {
//     try {
//       const response = await fetch(`https://api.github.com/orgs/${org}`, {
//         headers: {
//           'Accept': 'application/vnd.github.v3+json'
//         }
//       });
  
//       if (!response.ok) {
//         if (response.status === 404) {
//           throw new Error('Organization not found');
//         }
//         if (response.status === 403) {
//           throw new Error('GitHub API rate limit exceeded. Please try again later.');
//         }
//         throw new Error(`GitHub API error: ${response.status}`);
//       }
  
//       return true;
//     } catch (error) {
//       console.error('Failed to test GitHub API:', error);
//       throw error;
//     }
//   };