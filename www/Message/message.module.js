'use strict';

(function (angular) {

angular
    .module('Message', [])
    .config(function ($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('logged.message', {
          url: '/message',
          views: {
            'menuContent': {
              templateUrl: 'Message/teplates/message.html',
              controller: 'MessageController as MessageCtrl'
            }
          }
        });

    });

})(angular);
