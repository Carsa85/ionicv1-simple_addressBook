'use strict';

(function (angular) {

  angular.module('Signin')
    .controller('SigninController', SigninController);
  SigninController.$inject =
    ['$scope', '$log', '$state', '$ionicAuth', '$ionicUser', '$timeout', 'avatarUrlFilter', '$ionicPush', '$window'];

  function SigninController($scope, $log, $state, $ionicAuth, $ionicUser, $timeout, avatarUrlFilter, $ionicPush, $window) {

    var vm = this;

    vm.doSignIn = _doSignIn;
    vm.goToLogin = _goToLogin;
    vm.setDefaultImage = _setDefaultImage;
    vm.reset = _reset;
    vm.init = _init;

    $scope.getImage = _getImage;

    function cameraSuccess(imageData) {
      $timeout(function () {
        $scope.image = "data:image/jpeg;base64," + imageData;
      }, 100);

    }

    function cameraError(error) {
      $log.debug(error);
    }



    function _getImage() {

      vm.cameraOptions = {
        quality: 80,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 500,
        targetHeight: 500,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
        correctOrientation: true,
        cameraDirection: 1
      };

      navigator.camera.getPicture(cameraSuccess, cameraError, vm.cameraOptions);
    }

    function _doSignIn() {

      $ionicAuth.signup($scope.signinData).then(function () {
        var details = {
          'email': $scope.signinData.email,
          'password': $scope.signinData.password
        };

        _doLogin(details);

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

    function _setUserData() {
      var userCustomData = {
        'birthdate': $scope.signinData.birthdate || null,
        'name': $scope.signinData.name || null,
        'surname': $scope.signinData.surname || null,
        'gender': $scope.signinData.gender || null,
        'address': $scope.signinData.address || null,
        'country': $scope.signinData.country || null,
        'city': $scope.signinData.city || null,
        'zipCode': $scope.signinData.zipCode || null,
        'phone': $scope.signinData.phone || null
      }

      $ionicUser.set('userCustomData', userCustomData);
      $ionicUser.set('myImage', $scope.image || null);
      $ionicUser.save();
    }

    function _pushRegistration() {
      $ionicPush.register().then(function (t) {
        return $ionicPush.saveToken(t);
      }).then(function (t) {
        $log.debug('Token saved:', t.token);
      });
    }

    function _doLogin(loginData) {
      $ionicAuth.login('basic', loginData)
        .then(function (response) {
          $window.localStorage.setItem('token', response.token);
          _setUserData();
          _pushRegistration();
          _init();
          $log.debug(response);
          $state.go('logged.home');
        },
        function (error) {
          $log.debug(error);
        });
    }

    function _goToLogin() {
      $state.go('login');
    }

    function _setDefaultImage(gender) {
      $scope.defaultImage = avatarUrlFilter(gender);
    }

    function _reset() {
      $scope.signinData = {};
      if ($scope.signinForm) {
        $scope.signinForm.setPristine();
      }
    }

    function _init() {
      _reset();
      $scope.signinData.gender = 'G';
      $scope.defaultImage = avatarUrlFilter($scope.signinData.gender);
      $scope.image = null;
    }

    _init();

  }

})(angular);
