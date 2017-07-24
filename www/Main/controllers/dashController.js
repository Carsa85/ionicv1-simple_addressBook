'use strict';

(function (angular) {

  angular.module('Main')
    .controller('DashController', DashController);
  DashController.$inject =
    ['$scope', '$log', '$state'];

  function DashController($scope, $log, $state) {

    var vm = this;
  }

})(angular);
