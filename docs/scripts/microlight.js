!(function (e, t) {
  "function" == typeof define && define.amd ? define(["exports"], t) : t("undefined" != typeof exports ? exports : (e.microlight = {}));
})(this, function (e) {
  var t,
    i = window,
    n = document,
    o = "appendChild",
    r = "test",
    a = ";text-shadow:",
    l = "opacity:.",
    s = " 0px 0px ",
    c = "3px 0px 5",
    d = ")",
    u = n.getElementsByClassName("microlight"),
    f = function (e) {
      for (e = 0; (t = u[e++]); )
        for (
          var f,
            p,
            h,
            g,
            m,
            y = t.textContent,
            x = 0,
            b = y[0],
            w = 1,
            v = (t.innerHTML = ""),
            k = 0,
            C = /(\d*\, \d*\, \d*)(, ([.\d]*))?/g.exec(i.getComputedStyle(t).color),
            N = "px rgba(" + C[1] + ",",
            E = C[3] || 1;
          (p = f), (f = 7 > k && "\\" == f ? 1 : w);

        ) {
          if (
            ((w = b),
            (b = y[++x]),
            (g = v.length > 1),
            !w ||
              (k > 8 && "\n" == w) ||
              [/\S/[r](w), 1, 1, !/[$\w]/[r](w), ("/" == f || "\n" == f) && g, '"' == f && g, "'" == f && g, y[x - 4] + p + f == "-->", p + f == "*/"][k])
          )
            for (
              v &&
                (t[o]((m = n.createElement("span"))).setAttribute(
                  "style",
                  [
                    "",
                    a + s + 9 + N + 0.7 * E + ")," + s + 2 + N + 0.4 * E + d,
                    l + 6 + a + s + 7 + N + E / 4 + ")," + s + 3 + N + E / 4 + d,
                    l + 7 + a + c + N + E / 5 + "),-" + c + N + E / 5 + d,
                    "font-style:italic;" + l + 5 + a + c + N + E / 4 + "),-" + c + N + E / 4 + d,
                  ][
                    k
                      ? 3 > k
                        ? 2
                        : k > 6
                        ? 4
                        : k > 3
                        ? 3
                        : +/^(a(bstract|lias|nd|rguments|rray|s(m|sert)?|uto)|b(ase|egin|ool(ean)?|reak|yte)|c(ase|atch|har|hecked|lass|lone|ompl|onst|ontinue)|de(bugger|cimal|clare|f(ault|er)?|init|l(egate|ete)?)|do|double|e(cho|ls?if|lse(if)?|nd|nsure|num|vent|x(cept|ec|p(licit|ort)|te(nds|nsion|rn)))|f(allthrough|alse|inal(ly)?|ixed|loat|or(each)?|riend|rom|unc(tion)?)|global|goto|guard|i(f|mp(lements|licit|ort)|n(it|clude(_once)?|line|out|stanceof|t(erface|ernal)?)?|s)|l(ambda|et|ock|ong)|m(icrolight|odule|utable)|NaN|n(amespace|ative|ext|ew|il|ot|ull)|o(bject|perator|r|ut|verride)|p(ackage|arams|rivate|rotected|rotocol|ublic)|r(aise|e(adonly|do|f|gister|peat|quire(_once)?|scue|strict|try|turn))|s(byte|ealed|elf|hort|igned|izeof|tatic|tring|truct|ubscript|uper|ynchronized|witch)|t(emplate|hen|his|hrows?|ransient|rue|ry|ype(alias|def|id|name|of))|u(n(checked|def(ined)?|ion|less|signed|til)|se|sing)|v(ar|irtual|oid|olatile)|w(char_t|hen|here|hile|ith)|xor|yield)$/[
                            r
                          ](v)
                      : 0
                  ]
                ),
                m[o](n.createTextNode(v))),
                h = k && 7 > k ? k : h,
                v = "",
                k = 11;
              ![
                1,
                /[\/{}[(\-+*=<>:;|\\.,?!&@~]/[r](w),
                /[\])]/[r](w),
                /[$\w]/[r](w),
                "/" == w && 2 > h && "<" != f,
                '"' == w,
                "'" == w,
                w + b + y[x + 1] + y[x + 2] == "<!--",
                w + b == "/*",
                w + b == "//",
                "#" == w,
              ][--k];

            );
          v += w;
        }
    };
  (e.reset = f), "complete" == n.readyState ? f() : i.addEventListener("load", f, 0);
});
