'use strict';

(function () {
  var questionsArea = document.querySelector('.questions__list');

  var toggleText = function (item) {
    item.classList.toggle('questions__item--show');
  };

  questionsArea.addEventListener('click', function (evt) {
    evt.preventDefault();
    var target = evt.target.closest('button');
    if (target) {
      toggleText(target.closest('.questions__item'));
    }
  });
})();
