document.querySelector(".hamburger").addEventListener("click", function(event) {
  var nav = document.querySelector("#side-nav");
  nav.className = nav.className === "open" ? "" : "open";
});

Array.from(document.querySelectorAll(".blog-content a")).forEach(function(link) {
  link.setAttribute("target", "_blank");
});

Array.from(document.querySelectorAll("pre")).forEach(function(block) {
  var lines = [];
  block.innerHTML = block.innerHTML
    .split("\n")
    .map(function(line, index) {
      if (line.startsWith("^")) {
        lines.push(index + 1);
        line = line.replace("^", "  ");
      }
      return line;
    })
    .join("\n");

  block.setAttribute("data-line", lines.join(","));
});
