'use strict';

(function (angular) {

  angular.module('Main')
    .controller('DashController', DashController);
  DashController.$inject =
    ['$scope', '$log', '$state', '$ionicAuth', '$ionicFacebookAuth', '$ionicUser', '$ionicModal'];

  function DashController($scope, $log, $state, $ionicAuth, $ionicFacebookAuth, $ionicUser, $ionicModal) {

    var vm = this;
    vm.doLogout = _doLogout;


    $ionicModal.fromTemplateUrl('Main/templates/detail-modal.html', {
        scope: $scope,
        animation: 'slide-in-right'
      }).then(function (modal) {
        $scope.detail = modal;
      });

    $scope.openDetail = function() {
      $scope.detail.show();
    };

    $scope.closeDetail = function() {
      $scope.detail.hide();
    };

    function _doLogout() {
      $ionicFacebookAuth.logout();
    }
  }

})(angular);
