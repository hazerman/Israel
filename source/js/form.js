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

  var setRequiredCustom = function (input) {
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

      var finishValidation = function (hasInputName) {
        if (form.id === 'popup-form') {
          window.popup.removeSpecial();
        } else {
          window.popup.showAccepted();
        }
        if (hasInputName) {
          localStorage.setItem('name', inputName.value);
        }
        localStorage.setItem('tel', inputTel.value);
      };

      form.addEventListener('submit', function (evt) {
        evt.preventDefault();
        if (!inputName) {
          if (inputTel.value) {
            finishValidation(false);
          } else {
            inputTel.setAttribute('required', '');
          }
        } else {
          if (!inputName.value || !inputTel.value) {
            setRequiredCustom(inputName);
            setRequiredCustom(inputTel);
          } else {
            finishValidation(true);
          }
        }
      });
    }
  });
})();
