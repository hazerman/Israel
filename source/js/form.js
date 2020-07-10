'use strict';

(function () {
  var popupForm = document.querySelector('#popup-form');

  popupForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.popup.remove();
  });
})();

