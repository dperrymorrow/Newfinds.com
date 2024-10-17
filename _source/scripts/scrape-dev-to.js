import fetch from "node-fetch";
import fs from "fs";
import api from "./support/api.js";

const articles = await api.loadAllArticles();
articles.forEach(saveArticle);

async function saveArticle({ id }) {
  const article = await api.loadArticle(id);
  const slug = article.slug.split("-").slice(0, -1).join("-");

  const content = `---
title: ${article.title}
date: ${article.published_at}
cover: ${article.cover_image}
thumb: ${findThumb(article)}
---

${article.body_markdown}
`;

  fs.writeFileSync(`./public/posts/${slug}.md`, content);
}

function findThumb({ tags }) {
  if (tags.includes("vue")) return "img/vue-logo.svg";
  if (tags.includes("hotwire")) return "img/turbo-logo.svg";
  if (tags.includes("react")) return "img/react-logo.svg";
  if (tags.includes("javascript")) return "img/js-logo.svg";
  return null;
}
