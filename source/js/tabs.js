'use strict';

(function () {
  var CURRENT_MOD = '--current';
  var tabButtonsArea = document.querySelector('.programms__tabs-list');
  var programmArea = document.querySelector('.programms__list');

  if (tabButtonsArea && programmArea) {
    var tabButtons = tabButtonsArea.querySelectorAll('.programms__tabs-item');
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
  }
})();
