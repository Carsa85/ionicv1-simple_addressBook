'use strict';

(function (angular) {

  angular.module('Main')
    .factory('httpBaseUrlInterceptor', ['$log', 'APP_CONSTANT', function ($log, APP_CONSTANT) {
      return {
        request: function (config) {

          if (config) {
            if (config.url && config.url.indexOf('/api') === 0) {
              config.url = APP_CONSTANT.API.BASE_URL + config.url.replace('/api','');
              $log.debug('Added endpoint base URL : ' + config.url);
            }
            if (config.headers) {
              config.headers['Authorization'] = 'Bearer ' + APP_CONSTANT.API.API_TOKEN;
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
