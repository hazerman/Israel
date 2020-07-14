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
