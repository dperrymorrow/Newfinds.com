//= require_tree .
//= require prismjs/prism
//= require prismjs/components/prism-less
//= require jquery/dist/jquery
//= require bootstrap/js/affix

"use strict";
let adaptor = new MarkdownShim();
adaptor.prism().externalLinks();

