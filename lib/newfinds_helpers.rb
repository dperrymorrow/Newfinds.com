module NewfindsHelpers

  def project_articles
    blog.tags.each do |tag, articles|
      return articles if tag.downcase == 'projects'
    end
  end

end