import fetch from "node-fetch";
import fs from "fs";
import api from "./support/api.mjs";
import articleHelpers from "./support/article.mjs";

const postDir = "./_source/public/posts";
const articles = await api.loadAllArticles();

articles.map(articleHelpers.cleanSlug).forEach(saveArticle);

writeData(articles);

async function saveArticle({ id, slug }) {
  const article = await api.loadArticle(id);
  fs.writeFileSync(`${postDir}/${slug}.md`, article.body_markdown);
}

async function writeData(articles) {
  const hydrated = await Promise.all(
    articles.map(articleHelpers.cleanSlug).map(async (article) => {
      const comments = await api.loadComments(article.id);
      return { ...article, comments };
    })
  );

  const data = hydrated.reduce((obj, article) => {
    obj[article.slug] = article;
    return obj;
  }, {});

  fs.writeFileSync(`${postDir}/_data.json`, JSON.stringify(data, null, 2));
}
