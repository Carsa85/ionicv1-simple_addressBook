'use strict';

(function (angular) {

  angular.module('Main')
    .factory('httpBaseUrlInterceptor', ['$log', function ($log) {
      return {
        request: function (config) {

          if (config) {
            if (config.url && config.url.indexOf('/api') === 0) {
              config.url = 'https://api.ionic.io' + config.url.replace('/api','');
              $log.debug('Added endpoint base URL : ' + config.url);
            }
            if (config.headers) {
              config.headers['Authorization'] = 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkMzNmYzhhMC1iNTFlLTRjMmYtODQzNy1hOGViYWNmM2U5YzgifQ.rS_Kv47xInDqmEeeTckqeMTtjCTv-wgxEf2HkLqZ7II';
              config.headers['Content-Type'] = 'application/json; charset=utf-8';
            }
          }

          return config;

        }
      };
    }])
    .config(['$httpProvider', function ($httpProvider) {
      $httpProvider.interceptors.push('httpBaseUrlInterceptor');
    }]);

})(angular);
