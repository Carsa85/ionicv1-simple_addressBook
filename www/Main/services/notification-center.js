'use strict';

(function (angular) {

  angular.module('Main')
    .factory('NotificationCenter', ['PushService', function (PushService) {

      return {
        tokenCreate: function (payload) {
          return PushService.tokenCreate(payload).$promise.then(
            function (response) {
              return {
                status: true,
                response: response
              };
            }, function (error) {
              return {
                status: false,
                error: error
              };
            }
          );
        },
        notificationCreate: function (payload) {
          return PushService.notificationCreate(payload).$promise.then(
            function (response) {
              return {
                status: true,
                response: response
              };
            }, function (error) {
              return {
                status: false,
                error: error
              };
            }
          );
        }
      }

    }]);

})(angular);
