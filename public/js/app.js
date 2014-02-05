'use strict';

angular.module('qApp', [
  'ngRoute',
  'qApp.controllers',
  'qApp.filters',
  'qApp.services',
  'qApp.directives',
  'ui.sortable'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/view1', {
      templateUrl: 'partials/partial1',
      controller: 'QCtrl1'
    }).
    when('/view2', {
      templateUrl: 'partials/partial2',
      controller: 'QCtrl2'
    }).
    otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true)
})
