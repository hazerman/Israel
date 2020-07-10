'use strict';

(function () {
  var SHOWN_POPUP = 'popup--show';
  var popupRequest = document.querySelector('#request');
  var popupAccept = document.querySelector('#accepted');
  var currentPopup;
  var closeButton;
  var acceptButton;

  var callButton = document.querySelector('.header__info button');

  var removePopup = function () {
    currentPopup.classList.remove(SHOWN_POPUP);
    closeButton.removeEventListener('click', onCloseButtonClick);
    document.removeEventListener('keydown', onEscPress);
    closeButton = null;
    if (currentPopup === popupRequest) {
      currentPopup = null;
      showPopup(popupAccept);
    } else {
      currentPopup = null;
    }
  };

  var onCloseButtonClick = function () {
    removePopup();
  };

  var onAcceptButtonClick = function () {
    removePopup();
    acceptButton.removeEventListener('click', onAcceptButtonClick);
    acceptButton = null;
  };

  var onEscPress = function (evt) {
    window.util.escEvent(evt, removePopup);
  };

  var showPopup = function (popup) {
    currentPopup = popup;
    currentPopup.classList.add(SHOWN_POPUP);
    closeButton = currentPopup.querySelector('.popup__close-btn');
    closeButton.addEventListener('click', onCloseButtonClick);
    if (currentPopup.querySelector('.popup__button')) {
      acceptButton = currentPopup.querySelector('.popup__button');
      acceptButton.addEventListener('click', onAcceptButtonClick);
    }
    document.addEventListener('keydown', onEscPress);
  };

  callButton.addEventListener('click', function () {
    showPopup(popupRequest);
  });

  window.popup = {
    remove: removePopup
  };
})();
