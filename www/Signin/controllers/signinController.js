'use strict';

(function (angular) {

  angular.module('Signin')
    .controller('SigninController', SigninController);
  SigninController.$inject =
    ['$scope', '$log', '$state', '$ionicAuth', '$ionicUser', '$timeout'];

  function SigninController($scope, $log, $state, $ionicAuth, $ionicUser, $timeout) {

    var vm = this;

    vm.doSignIn = _doSignIn;

    $scope.signinData = {};
    $scope.image = './img/UserAvatar.png';

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
      var options = {
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
      navigator.camera.getPicture(cameraSuccess, cameraError, options);
    }

    function _doSignIn() {

      $ionicAuth.signup($scope.signinData).then(function () {
        var details = {'email': $scope.signinData.email, 'password': $scope.signinData.password};

        $ionicAuth.login('basic', details).then(function (res) {
          $log.debug(res);
          $ionicUser.set('birthdate', '5/17/1985');
          $ionicUser.set('myImage', $scope.image);
          $ionicUser.save();
          $state.go('logged.home');
        });

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








