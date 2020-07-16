'use strict';

(function () {
  var popupForm = document.querySelector('#popup-form');
  var travelForm = document.querySelector('#travel-form');
  var informationForm = document.querySelector('#information-form');

  var getValidityMessage = function (input) {
    if (input.validity.patternMismatch) {
      return '+7 (999) 999 99 99';
    }
    return '';
  };

  [popupForm, travelForm, informationForm].forEach(function (form) {
    var inputTel = form.querySelector('input[type=tel]');
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
      if (form.id === 'popup-form') {
        window.popup.removeSpecial();
      } else {
        window.popup.showAccepted();
      }
      localStorage.setItem('tel', inputTel.value);
      if (inputName) {
        localStorage.setItem('name', inputName.value);
      }
    });
  });
})();
