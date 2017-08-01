'use strict';

(function (angular) {

angular
    .module('Signin', [])
    .config(function ($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('signin', {
          url: '/signin',
          templateUrl: 'Signin/templates/signin.html',
          controller: 'SigninController as SigninCtrl'

        });

    });

})(angular);
