"use strict";

class PrismAdaptor {

  constructor() {
    this.keys = ['none', 'ruby', 'html', 'css', 'javascript', 'html', 'bash'];
    document.querySelectorAll("code").forEach(this.lookForKeys.bind(this));
  }

  lookForKeys(el) {
    this.keys.forEach(key => {

      let tag = `{{${key}}}`;

      if (el.innerText.includes(tag) && el.className === '') {
        el.className = `language-${key}`;
        el.innerText = el.innerText.replace(tag, '');
      }
    });

  }

}
