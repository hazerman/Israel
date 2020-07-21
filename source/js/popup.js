'use strict';

(function () {
  var SHOWN_POPUP = 'popup--show';
  var popupRequest = document.querySelector('#request');
  var popupAccept = document.querySelector('#accepted');
  var currentPopup;
  var closeButton;
  var acceptButton;

  var callButton = document.querySelector('.header__call-button');

  var removePopup = function () {
    currentPopup.classList.remove(SHOWN_POPUP);
    closeButton.removeEventListener('click', onCloseButtonClick);
    document.removeEventListener('keydown', onEscPress);
    closeButton = null;
    currentPopup = null;
    document.body.removeAttribute('style');
  };

  var onCloseButtonClick = function () {
    removePopup();
  };

  var onAcceptButtonClick = function () {
    removePopup();
    acceptButton.removeEventListener('click', onAcceptButtonClick);
    acceptButton = null;
  };

  var onPopupClick = function (evt) {
    var target = evt.target.closest('.popup__field');
    if (!target) {
      removePopup();
    }
  };

  var onEscPress = function (evt) {
    window.util.escEvent(evt, removePopup);
  };

  var showPopup = function (popup) {
    if (popup) {
      document.body.style.overflow = 'hidden';
      currentPopup = popup;
      currentPopup.classList.add(SHOWN_POPUP);
      if (currentPopup.querySelector('input')) {
        currentPopup.querySelector('input').focus();
      }
      closeButton = currentPopup.querySelector('.popup__close-btn');
      popup.addEventListener('click', onPopupClick);
      closeButton.addEventListener('click', onCloseButtonClick);
      if (currentPopup.querySelector('.popup__button')) {
        acceptButton = currentPopup.querySelector('.popup__button');
        acceptButton.addEventListener('click', onAcceptButtonClick);
      }
      document.addEventListener('keydown', onEscPress);
    }
  };

  var removeSpecial = function () {
    removePopup();
    showPopup(popupAccept);
  };

  var showAccepted = function () {
    showPopup(popupAccept);
  };

  if (callButton) {
    callButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      showPopup(popupRequest);
    });
  }

  window.popup = {
    showAccepted: showAccepted,
    removeSpecial: removeSpecial
  };
})();
