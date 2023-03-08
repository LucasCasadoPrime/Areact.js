const fetch = require('cross-fetch');

class Github {
    constructor() {
    this.token = process.env.GIT_TOKEN;
    }

// ====================================================================================================

    createWebhook(owner, repo, events) { 
        return new Promise((resolve, reject) => {
            fetch(`https://api.github.com/repos/${owner}/${repo}/hooks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${process.env.GIT_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json'
                },
                body: JSON.stringify({
                    "name": "web",
                    "active": true,
                    "events": events,
                    "config": {
                        "url": "https://webhook.site/4f1b1b1b-4f1b-4f1b-4f1b-4f1b1b1b1b1b",
                        "content_type": "json"
                    }
                })
            })
            .then(res => res.json())
            .then(json => resolve(json))
            .catch(err => reject(err))
        })
    }

    deleteWebhook(owner, repo, id) {
        return new Promise((resolve, reject) => {
            fetch(`https://api.github.com/repos/${owner}/${repo}/hooks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${process.env.GIT_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
    
            })
            .then(res => res.json())
            .then(json => resolve(json))
            .catch(err => reject(err))
        })
    }

    getWebhooks(owner, repo) {
        return new Promise((resolve, reject) => {
          fetch(`https://api.github.com/repos/${owner}/${repo}/hooks`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `token ${process.env.GIT_TOKEN}`,
              'Accept': 'application/vnd.github.v3+json'
            }
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
        });
      }
// ====================================================================================================
// Users
    getRepos(user) {
        return new Promise((resolve, reject) => {
            fetch(`https://api.github.com/users/${user}/repos`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${process.env.GIT_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            }) .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
        })
    }

    getFollowers(user) {
        return new Promise((resolve, reject) => {
            fetch(`https://api.github.com/users/${user}/followers`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${process.env.GIT_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            }) .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
        })
    }

    getFollowing(user) {
        return new Promise((resolve, reject) => {
            fetch(`https://api.github.com/users/${user}/following`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${process.env.GIT_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            }) .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
        })
    }

    getAUser(user) {
        return new Promise((resolve, reject) => {
            fetch(`https://api.github.com/users/${user}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${process.env.GIT_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            }) .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
        })
    }
// ====================================================================================================
// Repositories

    getCommits(owner, repo) {
        return new Promise((resolve, reject) => {
            fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${process.env.GIT_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    getARepo(owner, repo) {
        return new Promise((resolve, reject) => {
            fetch(`https://api.github.com/repos/${owner}/${repo}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${process.env.GIT_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
        })
    }

    getBranches(owner, repo) {
        return new Promise((resolve, reject) => {
            fetch(`https://api.github.com/repos/${owner}/${repo}/branches`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${process.env.GIT_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
        })
    }

    getStarredOfRepo(owner, repo) {
        return new Promise((resolve, reject) => {
            fetch(`https://api.github.com/repos/${owner}/${repo}/stargazers`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${process.env.GIT_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
        })
    }        

// ====================================================================================================

}



module.exports = Github;