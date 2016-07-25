---
title: LESS Tips & Tricks
date: 2015-05-01 00:00 UTC
tags: less
intro: A few tips and tricks you may not know about with your favorite CSS pre-processor LESS.
---


### Concat Variables

If you find yourself needing to concat variables in your LESS code, it's super easy and handy.

#### The LESS
```less
@cdnPrefix: "https://s3.amazonaws.com/some-bucket";
// now you can use this var anywhere...
.my-class {
  background-image: url("@{cdnPrefix}/images/bg-image.png");
}
```

#### Resulting CSS
```css
.my-class {
  background-image: url("https://s3.amazonaws.com/some-bucket/images/bg-image.png");
}
```

### Loops in Less

I wanted to make classes to make divs a percentage of their container in increments of 10. I could have written 10 classes, but this is much nicer and easier to maintain.

#### The LESS
```less
.mixin-loop (@index) when (@index > 0) {
  .per-@{index}0 {
    display: inline-block;
    width: @index * 10%;
  }
  .mixin-loop(@index - 1);
}
.mixin-loop (0) {}
.mixin-loop(10);
```

#### The resulting CSS

```css
.per-100 {
  display: inline-block;
  width: 100%;
}
.per-90 {
  display: inline-block;
  width: 90%;
}
.per-80 {
  display: inline-block;
  width: 80%;
}
.per-70 {
  display: inline-block;
  width: 70%;
}
.per-60 {
  display: inline-block;
  width: 60%;
}
.per-50 {
  display: inline-block;
  width: 50%;
}
.per-40 {
  display: inline-block;
  width: 40%;
}
.per-30 {
  display: inline-block;
  width: 30%;
}
.per-20 {
  display: inline-block;
  width: 20%;
}
.per-10 {
  display: inline-block;
  width: 10%;
}
```