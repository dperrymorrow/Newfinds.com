document.querySelector(".hamburger").addEventListener("click", function(event) {
  var nav = document.querySelector("#side-nav");
  nav.className = nav.className === "open" ? "" : "open";
});

Array.from(document.querySelectorAll(".blog-content a")).forEach(function(link) {
  link.setAttribute("target", "_blank");
});
