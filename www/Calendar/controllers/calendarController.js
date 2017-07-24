'use strict';

(function (angular) {

  angular.module('Main')
    .controller('CalendarController', CalendarController);
  CalendarController.$inject =
    ['$scope', '$log', '$state'];

  function CalendarController($scope, $log, $state) {

    var vm = this;
  }

})(angular);
