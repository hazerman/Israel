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
