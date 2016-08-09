//= require_tree .
//= require prismjs/prism
//= require prismjs/components/prism-less
//# require prismjs/components/prism-bash
//= require prismjs/components/prism-ruby
//= require luminous-lightbox/dist/Luminous

"use strict";
var adaptor = new MarkdownShim().prism().externalLinks();

var options = {
    // Prefix for generated element class names (e.g. `my-ns` will
    // result in classes such as `my-ns-lightbox`. Default `lum-`
    // prefixed classes will always be added as well.
    namespace: null,
    // Which attribute to pull the lightbox image source from.
    sourceAttribute: 'href',
    // Which attribute to pull the caption from, if any.
    captionAttribute: null,
    // The event to listen to on the _trigger_ element: triggers opening.
    openTrigger: 'click',
    // The event to listen to on the _lightbox_ element: triggers closing.
    closeTrigger: 'click',
    // Allow closing by pressing escape.
    closeWithEscape: true,
    // Automatically close when the page is scrolled.
    closeOnScroll: false,
    // A selector defining what to append the lightbox element to.
    appendToSelector: 'body',
    // If present (and a function), this will be called
    // whenever the lightbox is opened.
    onOpen: null,
    // If present (and a function), this will be called
    // whenever the lightbox is closed.
    onClose: null,
    // When true, adds the `imgix-fluid` class to the `img`
    // inside the lightbox. See https://github.com/imgix/imgix.js
    // for more information.
    includeImgixJSClass: false,
    // Add base styles to the page. See the "Theming"
    // section of README.md for more information.
    injectBaseStyles: true,
};

new LuminousGallery(document.querySelectorAll('.lightbox-link'), options);

document.querySelector('.hamburger').addEventListener("click", function( event ) {
  var nav = document.querySelector('#side-nav');
  nav.className = nav.className === 'open' ? '' : 'open';
});

