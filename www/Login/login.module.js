'use strict';

(function (angular) {

angular
    .module('Login', [])
    .config(function ($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('login', {
          url: '/login',
          templateUrl: 'Login/templates/login.html',
          controller: 'LoginController as LoginCtrl'

        });

    });

})(angular);
