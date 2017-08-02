'use strict';

(function (angular) {

  angular.module('Main')
    .controller('DashController', DashController);
  DashController.$inject =
    ['$scope', '$window', '$log', '$state', '$ionicAuth', '$ionicFacebookAuth', '$ionicUser', '$ionicModal'];

  function DashController($scope, $window, $log, $state, $ionicAuth, $ionicFacebookAuth, $ionicUser, $ionicModal) {

    var vm = this;
    vm.doLogout = _doLogout;

    $scope.openDetail = _openDetail;
    $scope.closeDetail = _closeDetail;

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

    function _init() {}

    _init();

  }

})(angular);
