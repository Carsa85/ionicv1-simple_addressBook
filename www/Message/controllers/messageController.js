'use strict';

(function (angular) {

  angular.module('Main')
    .controller('MessageController', MessageController);
  MessageController.$inject =
    ['$scope', '$log', '$state'];

  function MessageController($scope, $log, $state) {

    var vm = this;
  }

})(angular);
