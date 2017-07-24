'use strict';

(function (angular) {

angular
    .module('Calendar', [])
    .config(function ($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('logged.calendar', {
          url: '/calendar',
          views: {
            'menuContent': {
              templateUrl: 'Calendar/teplates/calendar.html',
              controller: 'CalendarController as CalendarCtrl'
            }
          }
        });

    });

})(angular);
