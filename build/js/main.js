'use strict';

(function () {
  var questionsArea = document.querySelector('.questions__list');

  questionsArea.classList.remove('questions__list--no-js');

  var toggleText = function (item) {
    item.classList.toggle('questions__item--show');
  };

  questionsArea.addEventListener('click', function (evt) {
    evt.preventDefault();
    var target = evt.target.closest('a');
    if (target) {
      toggleText(target.closest('.questions__item'));
    }
  });
})();

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
  };

  var removeSpecial = function () {
    removePopup();
    showPopup(popupAccept);
  };

  var showAccepted = function () {
    showPopup(popupAccept);
  };

  callButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    showPopup(popupRequest);
  });

  window.popup = {
    showAccepted: showAccepted,
    removeSpecial: removeSpecial
  };
})();

'use strict';

(function () {
  var commentList = document.querySelector('.review__comment-list');
  var commentItem = commentList.querySelectorAll('li');
  var photoList = document.querySelector('.review__photo-list');
  var photoItem = photoList.querySelectorAll('li');
  var actionArea = document.querySelector('.review__slider-action');
  var prevButton = actionArea.querySelector('.review__button--prev');
  var nextButton = actionArea.querySelector('.review__button--next');
  var counter = document.querySelector('#review-current');
  var slidesCount = commentItem.length;
  var currentSlide = 2;

  var changeSlide = function (direction) {
    commentItem[currentSlide].classList.remove('review__comment-item--current');
    photoItem[currentSlide].classList.remove('review__photo-item--current');
    if (direction) {
      currentSlide++;
      if (currentSlide > slidesCount - 1) {
        currentSlide = 0;
      }
    } else {
      currentSlide--;
      if (currentSlide < 0) {
        currentSlide = slidesCount - 1;
      }
    }
    commentItem[currentSlide].classList.add('review__comment-item--current');
    photoItem[currentSlide].classList.add('review__photo-item--current');
    counter.innerText = currentSlide + 1;
  };

  prevButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    changeSlide(false);
  });

  nextButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    changeSlide(true);
  });
})();

'use strict';

(function () {
  var SWIPE_MIN = 60;
  var swipeArea = document.querySelector('#swipe-slider');
  var slides = swipeArea.querySelectorAll('[data-swipe-slide]');
  var dotList = document.querySelector('.life__dot-list');
  var dotItems = dotList.querySelectorAll('.life__dot-item');
  var currentSlide = 0;

  var unify = function (evt) {
    return evt.changedTouches ? evt.changedTouches[0] : evt;
  };

  var changeSlide = function (direction) {
    slides[currentSlide].dataset.swipeSlide = 'false';
    dotItems[currentSlide].classList.remove('life__dot-item--current');
    if (direction) {
      currentSlide++;
    } else {
      currentSlide--;
    }
    swipeArea.style.transform = 'translateX(-' + currentSlide * 100 + '%)';
    slides[currentSlide].dataset.swipeSlide = 'true';
    dotItems[currentSlide].classList.add('life__dot-item--current');
  };

  swipeArea.addEventListener('touchstart', function (evt) {
    var startPosition = unify(evt).pageX;
    var onDocumentTouchEnd = function (endEvt) {
      var shift = startPosition - unify(endEvt).pageX;
      if (Math.abs(shift) >= SWIPE_MIN) {
        if (shift > 0 && currentSlide !== slides.length - 1) {
          changeSlide(true);
        } else if (shift < 0 && currentSlide !== 0) {
          changeSlide(false);
        }
      }
      document.removeEventListener('touchend', onDocumentTouchEnd);
    };
    document.addEventListener('touchend', onDocumentTouchEnd);
  });
})();

'use strict';

(function () {
  var CURRENT_MOD = '--current';
  var tabButtonsArea = document.querySelector('.programms__tabs-list');
  var tabButtons = tabButtonsArea.querySelectorAll('.programms__tabs-item');

  var programmArea = document.querySelector('.programms__list');
  var programmItems = programmArea.querySelectorAll('.programms__item');
  var currentIndex = 1;

  programmArea.classList.remove('programms__list--no-js');

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
