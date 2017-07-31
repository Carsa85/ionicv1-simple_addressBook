'use strict';

(function (angular) {

  angular.module('Login')
    .controller('LoginController', LoginController);
  LoginController.$inject =
    ['$scope', '$log', '$state', '$ionicAuth', '$ionicFacebookAuth', '$ionicGoogleAuth', '$ionicUser'];

  function LoginController($scope, $log, $state, $ionicAuth, $ionicFacebookAuth, $ionicGoogleAuth, $ionicUser) {

    var vm = this;
    vm.doLogin = _doLogin;
    vm.doFbLogin = _doFbLogin;
    vm.doGPlusLogin = _doGPlusLogin;

    function _doLogin() {
      var details = { 'email': 'carsa85@live.io', 'password': 'puppies123' };

      $ionicAuth.signup(details).then(function () {
        $state.go('logged.home');
      }, function (err) {
        for (var e of err.details) {
          if (e === 'conflict_email') {
            alert('Email already exists.');
          } else {
            // handle other errors
          }
        }
      });

    }

    function _doFbLogin() {

      $ionicFacebookAuth.login().then(function (res) {

        $state.go('logged.home');

      }, function (err) {
        for (var e of err.details) {
          if (e === 'conflict_email') {
            alert('Email already exists.');
          } else {
            // handle other errors
          }
        }
      });

    }

    function _doGPlusLogin() {

      $ionicGoogleAuth.login().then(function (res) {

        $state.go('logged.home');

      }, function (err) {
        for (var e of err.details) {
          if (e === 'conflict_email') {
            alert('Email already exists.');
          } else {
            // handle other errors
          }
        }
      });

    }

  }

})(angular);








