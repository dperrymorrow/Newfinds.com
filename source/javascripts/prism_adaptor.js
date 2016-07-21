"use strict";

class PrismAdaptor {

  constructor() {
  }


  prism() {
    this.keys = ['ruby', 'html', 'css', 'javascript', 'html', 'bash', 'less'];
    document.querySelectorAll("code").forEach(this.lookForKeys.bind(this));
  }

  lookForKeys(el) {
    this.keys.forEach(key => {
      if (el.classList.contains(key)) el.className = `language-${key}`;
    });

  }

}
