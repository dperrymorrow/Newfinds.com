require "lib/newfinds_helpers"
helpers NewfindsHelpers

configure :development do
  activate :livereload
end

activate :automatic_image_sizes
activate :directory_indexes
activate :autoprefixer

activate :blog do |blog|
  blog.layout = "blog"
end

set :css_dir, 'stylesheets'
set :js_dir, 'javascripts'
set :images_dir, 'images'

set :haml, { ugly: true }
set :markdown_engine, :redcarpet
set :markdown, fenced_code_blocks: true, smartypants: true, footnotes: true, link_attributes: { rel: 'nofollow' }, tables: true
# activate :syntax, line_numbers: true

sprockets.append_path File.join "#{root}", "node_modules"

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  # Enable cache buster
  # activate :asset_hash

  # Use relative URLs
  activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end

