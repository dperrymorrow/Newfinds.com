
(function () {
  "use strict";
  window.MarkdownShim = function () {}

  MarkdownShim.prototype = {
    prism: function () {
      this.keys = ['ruby', 'html', 'css', 'javascript', 'html', 'bash', 'less'];
      Array.from(document.querySelectorAll("code")).forEach(this.lookForKeys.bind(this));
      return this;
    },

    lookForKeys: function (el) {
      this.keys.forEach(function (key) {
        if (el.classList.contains(key)) el.className = "language-" + key;
      });
    },

    externalLinks: function () {
      Array.from(document.querySelectorAll(".blog .blog-content a")).forEach(function (link) {
        link.setAttribute("target", "_blank");
      });
      return this;
    }
  }

}());
