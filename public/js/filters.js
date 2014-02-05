'use strict';

angular.module('qApp.filters', []).
  filter('small', function () {
    return function(large) {
      return String(large).replace('large', 'small')
    }
  })
