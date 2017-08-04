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
              templateUrl: 'Calendar/templates/calendar.html',
              controller: 'CalendarController as CalendarCtrl'
            }
          }
        });

    });

})(angular);
