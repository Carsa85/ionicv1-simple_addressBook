'use strict';

(function (angular) {

  angular.module('Main')
    .constant('USER_SERVICES', {
      'RELATIVE_URL': '/api/users'
    })
    .factory('UserService', ['$resource', 'USER_SERVICES', function ($resource, USER_SERVICES) {

      return $resource(USER_SERVICES.RELATIVE_URL , {

      }, {
          usersList: {
            method: 'GET',
            params: {}
          }
        });

    }]);

})(angular);
