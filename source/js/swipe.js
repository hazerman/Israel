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
