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

  def nav_active path
    current_page.path == path ? {:class => "active"} : {}
  end

  def nav_active_article article
    if current_article
      current_article.title == article.title ? {:class => "active"} : {}
    else
      return {}
    end
  end

  def human_time str
    DateTime.parse(str).strftime '%b ’%y'
  end

end