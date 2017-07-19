'use strict';

(function (angular) {

  angular.module('Login')
    .controller('LoginController', LoginController);
  LoginController.$inject =
    ['$scope', '$log', '$state'];

  function LoginController($scope, $log, $state) {

    var vm = this;
    vm.doLogin = _doLogin;

    function _doLogin() {
      $state.go('logged.home');
    }

  }

})(angular);
