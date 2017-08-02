'use strict';

(function (angular) {

  angular.module('Main')
    .constant('PUSH_SERVICES', {
      'RELATIVE_URL': '/api/push'
    })
    .factory('PushService', ['$resource', 'PUSH_SERVICES', function ($resource, PUSH_SERVICES) {

      return $resource(PUSH_SERVICES.RELATIVE_URL + '/:status/:id' , {
        id: '@id',
        status: 'status'
      }, {
          tokenCreate: {
            method: 'POST',
            params: {
              status: 'tokens',
              id: null
            }
          },
          notificationCreate: {
            method: 'POST',
            params: {
              status: 'notifications',
              id: null
            }
          }
        });

    }]);

})(angular);
