const a = {
  github: {
    GITHUB_OAUTH_URL: "https://github.com/login/oauth/authorize",
    client_id: "6b2d8b5557ce1eb37639",
    client_secret: "63d9c8074aab4a0ab37df279ccf43d566f7cdee9",
    scope: "user",
    GET_OAUTH_URL() {
      return `${this.GITHUB_OAUTH_URL}?client_id=${this.client_id}&scope=${this.scope}`;
    },
  },
};

console.log(a.github.GET_OAUTH_URL());
