'use strict';

(function () {
  var popupForm = document.querySelector('#popup-form');

  popupForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.popup.remove();
  });
})();

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

  callButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    showPopup(popupRequest);
  });

  window.popup = {
    remove: removePopup
  };
})();

'use strict';

(function () {
  var CURRENT_MOD = '--current';
  var tabButtonsArea = document.querySelector('.programms__tabs-list');
  var tabButtons = tabButtonsArea.querySelectorAll('.programms__tabs-item');

  var programmArea = document.querySelector('.programms__list');
  var programmItems = programmArea.querySelectorAll('.programms__item');
  var currentIndex = 1;

  var changeTab = function (newIndex) {
    tabButtons[currentIndex].classList.remove('programms__tabs-item' + CURRENT_MOD);
    programmItems[currentIndex].classList.remove('programms__item' + CURRENT_MOD);
    tabButtons[newIndex].classList.add('programms__tabs-item' + CURRENT_MOD);
    programmItems[newIndex].classList.add('programms__item' + CURRENT_MOD);
    currentIndex = newIndex;
  };

  tabButtonsArea.addEventListener('click', function (evt) {
    evt.preventDefault();
    var target = evt.target.closest('a');
    if (target) {
      var tabButtonsIndex = Array.from(tabButtons).indexOf(target.closest('li'));
      changeTab(tabButtonsIndex);
    }
  });
})();

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
