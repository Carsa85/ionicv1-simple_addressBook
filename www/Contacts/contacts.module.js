'use strict';

(function (angular) {

angular
    .module('Contacts', [])
    .config(function ($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('logged.contacts', {
          url: '/contacts',
          views: {
            'menuContent': {
              templateUrl: 'Contacts/templates/contacts.html',
              controller: 'ContactsController as ContactsCtrl'
            }
          }
        });

    });

})(angular);
