---
title: Ruby Gotcha with Default Parameters
date: 2014-04-01 00:00 UTC
intro: Ruby handles default parameters fine when you either pass them or don’t, but what if you are passing something that might be null?
tags: Ruby
---

So you have a method in Ruby that you want to have a default value for a parameter. Easy right? Well turns out not so easy if you are passing dynamic values that are beyond your control.

__Example:__

```ruby
my_method(param='default string')
  puts param
end

# calling the method
my_method()
# => default string
```

This works as expected, the omitted parameters defaults correctly. But what happens when you pass in the value of another variable which may or may not be nil?

```ruby
hash = {
  headline: 'my headline',
  body: nil
}
my_method(hash[:body])
# => nil
```

What happened? I thought we set a default for the parameter? Well the default only works if the parameter was omitted, not if its "falsey" like I've assumed on a couple of occasions.

This comes into play when you are pulling dynamic values from objects to pass as parameters, and you do not know if the parameter you are passing is "falsey" or not.

### Solution?
Default the parameter to nil, and then check for "falsey".

__Example:__

```ruby
my_method(param=nil)
  param ||= 'default string'
  puts param
end

// calling the method
my_method()
# => default string
my_method(nil)
# => default string
```

So this solution covers both situations, the parameter is omitted, it still defaults to your string, and also if a nil value is passes as the parameter.

