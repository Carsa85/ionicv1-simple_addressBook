'use strict';

(function (angular) {

  angular.module('Login')
    .controller('LoginController', LoginController);
  LoginController.$inject =
    ['$scope', '$window', '$log', '$state', '$ionicAuth', '$ionicFacebookAuth', '$ionicGoogleAuth', '$ionicUser', '$ionicPopup', '$ionicPush', '$ionicDeploy'];

  function LoginController($scope, $window, $log, $state, $ionicAuth, $ionicFacebookAuth, $ionicGoogleAuth, $ionicUser, $ionicPopup, $ionicPush, $ionicDeploy) {

    var vm = this;

    vm.doLogin = _doLogin;
    vm.doFbLogin = _doFbLogin;
    vm.doGPlusLogin = _doGPlusLogin;
    vm.goToSignin = _goToSignin;
    vm.reset = _reset;
    vm.init = _init;

    $scope.download = _download;

    function _doLogin() {
      $ionicAuth.login('basic', $scope.loginData)
        .then(function (response) {
          $window.localStorage.setItem('token', response.token);
          _pushRegistration();
          $log.debug(response);
          $log.debug($ionicUser);
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
        $state.go('logged.home');
      }, function (error) {
        $log.debug(error);
      });

    }

    function _doGPlusLogin() {

      $ionicGoogleAuth.login().then(function (response) {
        _pushRegistration();
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
      $state.go('signin');
    }

    function _setUserData() {
      var data = {}
      if ($ionicUser.data && $ionicUser.data.data && $ionicUser.data.data.userCustomData) {
        data = $ionicUser.data.data.userCustomData;
      }

      var userCustomData = {
        'birthdate': data.birthdate || null,
        'name': data.name || null,
        'surname': data.surname || null,
        'gender': data.gender || null,
        'address': data.address || null,
        'country': data.country || null,
        'city': data.city || null,
        'zipCode': data.zipCode || null,
        'phone': data.phone || null
      };

      $ionicUser.set('userCustomData', userCustomData);
      $ionicUser.set('myImage', $ionicUser.social.facebook.data.profile_picture || null);
      $ionicUser.save();
    }

    function _checkUpdates() {
      $ionicDeploy.check()
        .then(function (snapshotAvailable) {
          if (snapshotAvailable) {
            // An elaborate, custom popup
            var deployPopup = $ionicPopup.show({
              template: '<p class="text-center">Update now ?</p>',
              title: 'Ionic updates',
              scope: $scope,
              subTitle: 'An unpdate is availlable',
              buttons: [
                {
                  text: 'Cancel',
                  type: 'button-assertive'
                },
                {
                  text: 'Update',
                  type: 'button-positive',
                  onTap: function (e) {
                    $scope.download();
                  }
                }
              ]
            });
          }
        });
    }

    function _download() {
      $ionicDeploy.download()
        .then(function () {
          return $ionicDeploy.extract();
        })
        .then(function () {
          $ionicDeploy.load();
        });
    }

    function _reset() {
      $scope.loginData = {};
      if ($scope.loginForm) {
        $scope.loginForm.setPristine();
      }
    }

    function _init() {
      _checkUpdates();
      _reset();
    }

    _init();

  }

})(angular);
