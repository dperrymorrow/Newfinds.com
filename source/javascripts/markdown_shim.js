"use strict";

class MarkdownShim {

  constructor() {
  }


  prism() {
    this.keys = ['ruby', 'html', 'css', 'javascript', 'html', 'bash', 'less'];
    document.querySelectorAll("code").forEach(this.lookForKeys.bind(this));
    return this;
  }

  lookForKeys(el) {
    this.keys.forEach(key => {
      if (el.classList.contains(key)) el.className = `language-${key}`;
    });
  }

  externalLinks() {
    document.querySelectorAll(".blog-content a").forEach(link => {
      link.setAttribute("target", "_blank");
    });
    return this;
  }

}
