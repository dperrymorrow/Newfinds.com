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

document.querySelector("#nav-toggle").addEventListener("click", (ev) => {
  ev.stopPropagation();
  ev.preventDefault();
  document.querySelector("section.nav").classList.toggle("active");
});

document.body.addEventListener("click", (ev) => {
  document.querySelector("section.nav").classList.remove("active");
});
