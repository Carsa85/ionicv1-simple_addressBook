'use strict';

(function (angular) {

  angular.module('Main')
    .constant('USER_SERVICES', {
      'RELATIVE_URL': '/api/users'
    })
    .factory('UserService', ['$resource', 'USER_SERVICES', function ($resource, USER_SERVICES) {

      return $resource(USER_SERVICES.RELATIVE_URL + "/:status/:id", {
        id: '@id',
        status: 'status'
      }, {
          usersList: {
            method: 'GET',
            params: {
              status: null,
              id: null
            }
          },
          user: {
            method: 'GET',
            params: {
              status: null,
              id: null
            }
          }
        });

    }]);

})(angular);
