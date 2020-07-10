'use strict';

(function () {
  var KEY_ESC = 27;

  var elementEscPressHadler = function (evt, callback) {
    if (evt.keyCode === KEY_ESC) {
      callback();
    }
  };

  window.util = {
    escEvent: elementEscPressHadler
  };
})();
