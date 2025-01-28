Array.from(document.querySelectorAll(".md a")).forEach((link) => {
  link.setAttribute("target", "_blank");
});

// Prism.manual = true;
// Prism.highlightAll();

Array.from(document.querySelectorAll(".language-vue")).forEach((block) => {
  block.classList.remove("language-vue");
  block.classList.add("language-html");
  Prism.highlightElement(block);
});

Array.from(document.querySelectorAll("h1, h2, h3")).forEach(($el) => {
  $el.setAttribute("id", $el.innerText.toLowerCase().replace(/\s+/g, "-"));
});
