'use strict';

(function (angular) {
  var deps = [];

  // Address book deps
  deps.push('Login');


  angular
    .module('Main', deps)
    .config(function ($stateProvider, $urlRouterProvider) {
      $stateProvider

        .state('logged', {
          url: '/logged',
          abstract: true,
          templateUrl: 'Main/templates/menu.html',
        })

        .state('logged.home', {
          url: '/home',
          views: {
            'menuContent': {
              templateUrl: 'Main/templates/home.html'
            }
          }
        });

      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/login');
    });

})(angular);
