
Sometimes CSS and media queries can only go so far. Sometimes you need to manipulate some things with Javascript.
That was the situation I found myself in while trying to format some pages for printing.

After some quick looking for options I discovered [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) method. This did the trick.

It is a method that returns a ``mediaQueryList`` object which you can then add listeners to. In this case since we passed ``print`` to the ``matchMedia`` method, if it's a match, we are about to print, if not the formatted page has been sent to the printer and we can restore the normal web display.

However, IE only has this feature after version 10. Unfortunately I needed to support IE 9. _sigh..._

| Feature       | Firefox (Gecko)   | Chrome | Internet Explorer | Opera | Safari |
|---------------|-------------------|--------|-------------------|-------|--------|
| Basic support | 6.0               | 9      | 10                | 12.1  | 5.1    |


IE has ``onbeforeprint`` and ``onafterprint`` callbacks, I was able to use these if the ``matchMedia`` method was unavailable.

Here was my final solution.

```javascript
(function() {
  var beforePrint = function () {
    console.log('Functionality to run before printing.');
  };
  var afterPrint = function () {
    console.log('Functionality to run after printing');
  };

  // check and see if the method exists on window
  if (window.matchMedia) {
    var mediaQueryList = window.matchMedia('print');
    mediaQueryList.addListener(function (mql) {
      if (mql.matches) {
        beforePrint();
      } else {
        afterPrint();
      }
    });
  }

  // for IE
  window.onbeforeprint = beforePrint;
  window.onafterprint = afterPrint;
}());
```
