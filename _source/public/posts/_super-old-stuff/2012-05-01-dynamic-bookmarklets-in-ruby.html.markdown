---
title: Create Dynamic Bookmarklets in Ruby
date: 2012-05-01 00:00 UTC
tags: Ruby
intro: An easy way to create a Javascript bookmarklet from a JS file with Ruby variables interpolated into the bookmarklet.
---

I recently had the need for a dynamic bookmarklet. I was working on a little project for a bookmarklet to save URLs and notes to a Rails back-end for the user that downloaded the bookmarklet.

I needed the following,

- Some ruby variables to be cooked into the bookmarklet
- I didn't want to work with compressed, or minimized code when I wanted to make changes to my Javascript
- the bookmarklet needed to be generated on-demand per user request with the user's api token in the bookmarklet code


My solution was a Ruby helper in my Rails stack to generate the bookmarklet from a Javascript file that had tempting keys within.

So say you had a ``hello.js`` file like so...

```javascript
alert("Hello {{user_name}}, It is nice to see you!");
```

The Ruby Helper to process the Javascript. I needed to install the _Uglifier_ gem prior to running this. The example below is using the Rails root path, but if you are not in rails, you would just use the path to your JS file.

```ruby
require 'uglifier'

module BookmarkletHelper
  def get_bookmarklet(file, hash)
    js = File.open( "#{Rails.root}/app/assets/javascripts/#{file}", 'r' ).read
    js = Uglifier.compile(js, :mangle => false, :comments => :none)

    js_vars.each_pair do |k, v|
      js.gsub!("{{#{k.to_s}}}", v)
    end

    "javascript:(function(){#{js}}());"
  end
end
```

Then to give your user the link to download their customized bookmarklet, you would just do as follows.

```html
<% hash = { :user_name => 'David' } %>
<a href="<%= get_bookmarklet('hello.js', hash) %>">Your Bookmarklet</a>
```