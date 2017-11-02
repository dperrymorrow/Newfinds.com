const fs = require("fs");
const path = require("path");
const data = require("../public/posts/_data.json");

const dest = path.resolve(__dirname + "/../public/posts/_data.json");
const sortArr = [];
const output = {};

Object.keys(data).forEach(slug => {
  const article = data[slug];
  article.slug = slug;
  sortArr.push(article);
});

sortArr
  .sort((a, b) => new Date(a.date) - new Date(b.date))
  .reverse()
  .forEach(article => {
    output[article.slug] = article;
    delete article.slug;
  });

fs.writeFile(dest, JSON.stringify(output, null, 2), "utf-8", (err, data) => {
  if (err) return console.log(err);
  console.log("sorted the articles...");
});
