'use strict';

(function (angular) {

  angular.module('Login')
    .controller('LoginController', LoginController);
  LoginController.$inject =
    ['$scope', '$window', '$log', '$state', '$ionicAuth', '$ionicFacebookAuth', '$ionicGoogleAuth', '$ionicUser', '$ionicPopup', '$ionicPush'];

  function LoginController($scope, $window, $log, $state, $ionicAuth, $ionicFacebookAuth, $ionicGoogleAuth, $ionicUser, $ionicPopup, $ionicPush) {

    var vm = this;

    vm.doLogin = _doLogin;
    vm.doFbLogin = _doFbLogin;
    vm.doGPlusLogin = _doGPlusLogin;
    vm.goToSignin = _goToSignin;
    vm.reset = _reset;
    vm.init = _init;

    function _doLogin() {
      $ionicAuth.login('basic', $scope.loginData)
        .then(function (response) {
          $window.localStorage.setItem('token', response.token);
          _pushRegistration();
          _init();
          $log.debug(response);
          $state.go('logged.home');
        },
        function (error) {
          $log.debug(error);
        });
    }

    function _doFbLogin() {

      $ionicFacebookAuth.login().then(function (response) {
        $window.localStorage.setItem('token', response.token);
        _setUserData();
        _pushRegistration();
        _init();
        $state.go('logged.home');
      }, function (error) {
        $log.debug(error);
      });

    }

    function _doGPlusLogin() {

      $ionicGoogleAuth.login().then(function (response) {
        _pushRegistration();
        _init();
        $state.go('logged.home');
      }, function (error) {
        $log.debug(error);
      });

    }

    function _pushRegistration() {
      $ionicPush.register().then(function (t) {
        return $ionicPush.saveToken(t);
      }).then(function (t) {
        $log.debug('Token saved:', t.token);
      });
    }

    function _goToSignin() {
      _init();
      $state.go('signin');
    }

    function _setUserData() {
      var userCustomData = {
        'birthdate': null,
        'name': null,
        'surname': null,
        'gender': null,
        'address': null,
        'country': null,
        'city': null,
        'zipCode': null,
        'phon': null
      }

      $ionicUser.set('userCustomData', userCustomData);
      $ionicUser.set('myImage', $ionicUser.social.facebook.data.profile_picture || null);
      $ionicUser.save();
    }

    function _reset() {
      $scope.loginData = {};
      if ($scope.loginForm) {
        $scope.loginForm.setPristine();
      }
    }

    function _init() {
      _reset();
    }

    _init();

  }

})(angular);
