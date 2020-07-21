'use strict';

(function () {
  var popupForm = document.querySelector('#popup-form');
  var travelForm = document.querySelector('#travel-form');
  var informationForm = document.querySelector('#information-form');
  var maskOptions = {
    mask: '+{7} (000) 000 00 00'
  };

  var getValidityMessage = function (input) {
    if (input.validity.patternMismatch) {
      return '+7 (999) 999 99 99';
    }
    return '';
  };

  [popupForm, travelForm, informationForm].forEach(function (form) {
    if (form) {
      var inputTel = form.querySelector('input[type=tel]');
      var mask = window.iMask(inputTel, maskOptions);
      mask.updateValue();
      inputTel.value = localStorage.getItem('tel');
      var inputName = null;
      if (form.querySelector('input[type=text]')) {
        inputName = form.querySelector('input[type=text]');
        inputName.value = localStorage.getItem('name');
      }
      inputTel.removeAttribute('required');
      inputTel.addEventListener('input', function () {
        inputTel.setCustomValidity(getValidityMessage(inputTel));
      });

      form.addEventListener('submit', function (evt) {
        evt.preventDefault();
        if (inputTel.value) {
          if (form.id === 'popup-form') {
            window.popup.removeSpecial();
          } else {
            window.popup.showAccepted();
          }
          localStorage.setItem('tel', inputTel.value);
          if (inputName) {
            localStorage.setItem('name', inputName.value);
          }
        } else {
          inputTel.setAttribute('required', '');
        }
      });
    }
  });
})();
