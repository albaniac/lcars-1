'use strict';

var LCARS = (function () {

  return {

    styleButtons: function () {
      var buttons = document.querySelectorAll('.button')
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].querySelector('.button-label').textContent = this.generateRandomNumber()
      }
    },

    generateRandomNumber: function () {
      var scale = Math.random() * 100,
          random

      if (scale < 40) {
        random = Math.random() * 1000
      } else if (scale < 80) {
        random = Math.random() * 10000
      } else {
        random = Math.random() * 100000
      }

      return Math.floor(random)
    },

    init: function () {
      console.log('Initializing LCARS')
      this.styleButtons()
    }

  }

})()