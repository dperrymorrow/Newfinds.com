import fetch from "node-fetch";

async function load(url) {
  const res = await fetch(url);
  const string = await res.text();
  return JSON.parse(string);
}

export default {
  loadComments(articleId) {
    return load(`https://dev.to/api/comments?a_id=${articleId}`);
  },

  loadArticle(articleId) {
    return load(`https://dev.to/api/articles/${articleId}`);
  },

  loadAllArticles() {
    return load("https://dev.to/api/articles?username=dperrymorrow&page=1&per_page=100");
  },
};
