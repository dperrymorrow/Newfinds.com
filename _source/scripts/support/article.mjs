export default {
  cleanSlug(article) {
    const slug = article.slug.split("-").slice(0, -1).join("-");
    return { ...article, slug };
  },
};
