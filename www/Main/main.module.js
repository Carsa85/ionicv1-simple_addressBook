'use strict';

(function (angular) {
  var deps = [];

  // Address book deps
  deps.push('Login');
  deps.push('Signin');
  deps.push('Contacts');
  deps.push('Calendar');
  deps.push('Message');
  deps.push('Favourites');

  angular
    .module('Main', deps)
    .config(function ($stateProvider, $urlRouterProvider) {
      $stateProvider

        .state('logged', {
          url: '/logged',
          abstract: true,
          templateUrl: 'Main/templates/menu.html',
          controller: 'DashController as DashnCtrl'
        })

        .state('logged.home', {
          url: '/home',
          views: {
            'menuContent': {
              templateUrl: 'Main/templates/home.html',
              controller: 'DashController as DashnCtrl'
            }
          }
        });

      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/login');
    });

})(angular);
