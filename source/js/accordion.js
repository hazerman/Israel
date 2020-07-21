'use strict';

(function () {
  var questionsArea = document.querySelector('.questions__list');

  if (questionsArea) {
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
  }
})();
