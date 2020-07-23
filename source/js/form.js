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

  var checkInputValue = function (input) {
    if (!input.value) {
      input.setAttribute('required', '');
    }
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
        inputName.removeAttribute('required');
        inputName.value = localStorage.getItem('name');
      }
      inputTel.removeAttribute('required');
      inputTel.addEventListener('input', function () {
        inputTel.setCustomValidity(getValidityMessage(inputTel));
      });

      form.addEventListener('submit', function (evt) {
        evt.preventDefault();
        if (!inputName) {
          checkInputValue(inputTel);
          return;
        }
        if (!inputTel.value || !inputName.value) {
          checkInputValue(inputTel);
          checkInputValue(inputName);
        } else {
          if (form.id === 'popup-form') {
            window.popup.removeSpecial();
          } else {
            window.popup.showAccepted();
          }
          localStorage.setItem('name', inputName.value);
          localStorage.setItem('tel', inputTel.value);
        }
      });
    }
  });
})();
