

const GithubService = {
  GithubSearch: async function(textValue) {
    return fetch(`https://api.github.com/search/repositories?q=${textValue}`)
      .then(res => res.json())
      .then(json => {
        return json;
      })
      .catch(err => console.log("Error message:", err.statusText));
  },

  GetGithubBookmark: async function() {
    return fetch(`/GitHubService/GetStoredGithub`,)
      .then(res => res.json())
      .then(json => {
        return json;
      })
      .catch(err => {
        console.log("Please check if web service is running.");
      });
  },

  AddRemoveItem: function(item, action) {
    fetch("/GitHubService/SotreData", {
      method: "POST",
      body: JSON.stringify({
        actionName: action,
        card: item
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      //.then(json => {})
      .catch(err => console.log("Error message:", err.statusText));
  }
};
export default GithubService;
