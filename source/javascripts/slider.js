window.util = window.util || {};
window.util.PanelSlider = (function () {
  "use strict";

  function PanelSlider(options) {
    this.options = options;
    this.$selectors = options.selectors;
    this.assignTops();
    this.listen();
  }

  PanelSlider.prototype = {
    assignTops: function () {
      var top = 0;
      this.$selectors.each(function () {
        $(this).css('top', top + 'px').data('orgtop', top);
        top += $(this).height();
      });
    },

    listen: function () {
      $(window).scroll($.proxy(this, 'scrolled'));
      $(window).resize($.proxy(this, 'assignTops'));
    },

    scrolled: function () {
      var currentTop = $(window).scrollTop();

      this.$selectors.each(function () {
        var $panel = $(this);
        if (currentTop > $panel.data('orgtop')) {
          $panel.addClass('static');
        } else {
          $panel.removeClass('static');
        }
      });
    }
  };
  
  return PanelSlider;
}());


new util.PanelSlider({selectors: $('.slide-panel')});

