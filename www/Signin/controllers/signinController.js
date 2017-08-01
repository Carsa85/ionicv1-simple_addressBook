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
    $scope.image = '/img/UserAvatar.png';

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
        quality: 50,
        destinationType: 0,
        sourceType: 0,
        encodingType: 0,
        mediaType: 0,
        allowEdit: true,
        correctOrientation: true
      };
      navigator.camera.getPicture(cameraSuccess, cameraError, options);
    }

    function _doSignIn() {

      $ionicAuth.signup($scope.signinData).then(function () {
        $ionicUser.set('birthdate', '5/17/1985');
        $ionicUser.set('image', $scope.image);
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








