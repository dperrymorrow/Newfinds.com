Recently I had a need to get styles of an element dynamically from Javascript. After a bit of searching I discovered `getComputedStyle`. It was exactly what I was looking for.

It takes a second param for the property, but if you omit, it reuturns all.

It returns an _"Array like"_ object of type `CSSStyleDeclaration` that can be converted to an array and iterated on. using the `getPropertyValue` method the value of the keys can be retrieved.

The interesting part is this bit from MDN.

> The returned style is a live CSSStyleDeclaration object, which updates itself automatically when the element's style is changed.

### Support

All the way back to IE 9

```bash
IE ✘ 5.5+ ✔ 9+
Edge ✔
Firefox ✘ 2+ ◒ 3+¹ ✔ 4+
Chrome ◒ 4+² ✔ 11+
Safari ◒ 3.1+² ✔ 5+
Opera ◒ 9+² ✔ 10.6+
```
