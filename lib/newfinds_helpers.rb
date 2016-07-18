module NewfindsHelpers

  def project_articles
    blog.tags.each do |tag, articles|
      return articles if tag.downcase == 'projects'
    end
  end

  def article_summary article
    txt = strip_tags article.summary(250, '…')
    txt.split(article.title).last
  end

end