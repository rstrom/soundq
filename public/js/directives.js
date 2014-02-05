'use strict';

angular.module('qApp.directives', []).
  directive('back', function() {
    return function (scope, element, attrs) {
      attrs.$observe('back', function (value) {
        element.css({
          'background-image': 'url(' + value +')',
          'background-size' : 'cover'
        })
      })
    }
  }).
  directive('search', function (soundcloud) {
    return function (scope, element, attrs) {
        element.bind('keyup', function() {
          console.log(scope.search.input)
          if (scope.search.input == '') {
            scope.search.results = []
          } else {
            soundcloud.get(scope.search.input).
            then(function (tracks) {
              console.log(tracks)
              scope.search.results = tracks
            })
          }
        })
        element.bind('keydown keypress', function (event) {
          switch (event.which) {
            case 13:
              event.preventDefault()
              scope.queue.add(scope.search.selected)
              break
            case 38:
              event.preventDefault()
              scope.$apply(scope.search.selected--)
              break
            case 40:
              event.preventDefault()
              scope.$apply(scope.search.selected++)
              break
          }
        })
      }
    
  })