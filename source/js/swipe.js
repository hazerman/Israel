'use strict';

(function () {
  var MAX_MOBILE = 767;
  var MOBILE_MEDIA = '(max-width:' + MAX_MOBILE + 'px)';
  var SWIPE_MIN = 60;
  var swipeSlider = document.querySelector('#swipe-slider');
  var swipeArea = swipeSlider.parentElement;
  var slides = swipeSlider.querySelectorAll('[data-swipe-slide]');
  var dotList = document.querySelector('.life__dot-list');
  var dotItems = dotList.querySelectorAll('.life__dot-item');
  var currentSlide = 0;

  var unify = function (evt) {
    return evt.changedTouches ? evt.changedTouches[0] : evt;
  };

  var changeSlide = function (direction, needReset) {
    slides[currentSlide].dataset.swipeSlide = 'false';
    dotItems[currentSlide].classList.remove('life__dot-item--current');
    if (direction && !needReset) {
      currentSlide++;
    } else if (!direction && !needReset) {
      currentSlide--;
    } else if (needReset) {
      currentSlide = 0;
    }
    swipeSlider.style.transform = 'translateX(-' + currentSlide * 100 + '%)';
    slides[currentSlide].dataset.swipeSlide = 'true';
    dotItems[currentSlide].classList.add('life__dot-item--current');
  };

  var onSwipeAreaActionStart = function (evt) {
    var startPosition = unify(evt).pageX;

    var onDocumentActionEnd = function (endEvt) {
      var shift = startPosition - unify(endEvt).pageX;
      if (Math.abs(shift) >= SWIPE_MIN) {
        if (shift > 0 && currentSlide !== slides.length - 1) {
          changeSlide(true);
        } else if (shift < 0 && currentSlide !== 0) {
          changeSlide(false);
        }
      }
      document.removeEventListener('touchend', onDocumentActionEnd);
      document.removeEventListener('mouseup', onDocumentActionEnd);
    };

    document.addEventListener('touchend', onDocumentActionEnd);
    document.addEventListener('mouseup', onDocumentActionEnd);
  };

  var addSwipeAreaListeners = function () {
    swipeArea.addEventListener('touchstart', onSwipeAreaActionStart);
    swipeArea.addEventListener('mousedown', onSwipeAreaActionStart);
  };

  var removeSwipeAreaListeners = function () {
    swipeArea.removeEventListener('touchstart', onSwipeAreaActionStart);
    swipeArea.removeEventListener('mousedown', onSwipeAreaActionStart);
    changeSlide(true, true);
  };

  if (window.matchMedia(MOBILE_MEDIA).matches) {
    addSwipeAreaListeners();
  }

  window.addEventListener('resize', function () {
    if (window.innerWidth <= MAX_MOBILE) {
      addSwipeAreaListeners();
    } else {
      removeSwipeAreaListeners();
    }
  });
})();
