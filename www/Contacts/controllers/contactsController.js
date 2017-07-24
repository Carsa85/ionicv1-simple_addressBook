'use strict';

(function (angular) {

  angular.module('Main')
    .controller('ContactsController', ContactsController);
  ContactsController.$inject =
    ['$scope', '$log', '$state'];

  function ContactsController($scope, $log, $state) {

    var vm = this;
  }

})(angular);
