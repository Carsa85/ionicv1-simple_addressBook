'use strict';

(function (angular) {

  angular.module('Main')
    .controller('DashController', DashController);
  DashController.$inject =
    ['$scope', '$window', '$log', '$state', '$ionicAuth', '$ionicFacebookAuth', '$ionicUser', '$ionicModal', 'avatarUrlFilter', 'UserService', '$filter'];

  function DashController($scope, $window, $log, $state, $ionicAuth, $ionicFacebookAuth, $ionicUser, $ionicModal, avatarUrlFilter, UserService, $filter) {

    var vm = this;
    vm.doLogout = _doLogout;

    $scope.openDetail = _openDetail;
    $scope.closeDetail = _closeDetail;
    $scope.openProfile = _openProfile;
    $scope.closeProfile = _closeProfile;
    $scope.setDefaultImage = _setDefaultImage;
    $scope.getImage = _getImage;
    $scope.goTo = _goTo;

    $ionicModal.fromTemplateUrl('Main/templates/profile-edit-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.profile = modal;
    });

    function _openProfile() {
      $scope.profile.show();
    };

    function _closeProfile(saveProfile) {
      if (saveProfile) {
        _setUserData();
      }
      $scope.profile.hide();
    };

    function _setDefaultImage(gender) {
      $scope.defaultImage = avatarUrlFilter(gender);
    }

    function setGender(item) {
      if (item && item.custom && item.custom.userCustomData && item.custom.userCustomData.gender) {
        item.defImage = avatarUrlFilter(item.custom.userCustomData.gender);
      } else {
        item.defImage = avatarUrlFilter('G');
      }
      return item;
    }

    function cameraSuccess(imageData) {
      $timeout(function () {
        $scope.yourUser.custom.myImage = "data:image/jpeg;base64," + imageData;
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

    function _setUserData() {
      var userCustomData = {
        'birthdate': $scope.yourUser.custom.userCustomData.birthdate || null,
        'name': $scope.yourUser.custom.userCustomData.name || null,
        'surname': $scope.yourUser.custom.userCustomData.surname || null,
        'gender': $scope.yourUser.custom.userCustomData.gender || null,
        'address': $scope.yourUser.custom.userCustomData.address || null,
        'country': $scope.yourUser.custom.userCustomData.country || null,
        'city': $scope.yourUser.custom.userCustomData.city || null,
        'zipCode': $scope.yourUser.custom.userCustomData.zipCode || null,
        'phone': $scope.yourUser.custom.userCustomData.phone || null
      }

      $ionicUser.set('userCustomData', userCustomData);
      $ionicUser.set('myImage', $scope.yourUser.custom.myImage || null);
      $ionicUser.save();
    }

    $ionicModal.fromTemplateUrl('Main/templates/detail-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.detail = modal;
    });

    function _openDetail() {
      $scope.detail.show();
    };

    function _closeDetail() {
      $scope.detail.hide();
    };

    function _doLogout() {
      $window.localStorage.removeItem('token');
      $ionicFacebookAuth.logout();
      $state.go('login');
    }

    function _getUser() {
      UserService.user({ "id": $ionicUser.id })
        .$promise
        .then(function (response) {
          response.data = setGender(response.data);
          $scope.yourUser = response.data;
          $scope.defaultImage = avatarUrlFilter($scope.yourUser.custom.userCustomData.gender);
          $log.debug(response);
        }, function (error) {
          $log.debug(error);
        });
    }

    function _goTo(state)  {
      $state.go(state);
    }

    function _init() {

      var labels = ["Contacts", "Favourites", "Iterations"];
      var data = [40, 5, 100];
      var options = {
        legend: {
          display: true,
        }
      };

      $scope.chart = {
        'labels' : labels,
        'data' : data,
        'options': options
      };

      $scope.yourUser = {};
      $scope.yourUser.lengt
      _getUser();

      //init bedge
      $scope.bedge = {
        'contacts': $window.localStorage.getItem('contacts') ? JSON.parse($window.localStorage.getItem('contacts')).length : 0,
        'events': $window.localStorage.getItem('events') ? JSON.parse($window.localStorage.getItem('events')).length : 0,
        'favourites': $window.localStorage.getItem('contacts') ? $filter('filter')(JSON.parse($window.localStorage.getItem('contacts')), { 'isFavourite': true }).length : 0
      }

    }

    _init();

  }

})(angular);
