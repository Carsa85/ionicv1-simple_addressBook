'use strict';

(function (angular) {

  angular.module('Main')
    .controller('DashController', DashController);
  DashController.$inject =
    ['$scope', '$log', '$state', '$ionicModal'];

  function DashController($scope, $log, $state, $ionicModal) {

    $ionicModal.fromTemplateUrl('Main/templates/detail-modal.html', {
        scope: $scope,
        animation: 'splat'
      }).then(function (modal) {
        $scope.detail = modal;
      });

    $scope.openDetail = function() {
      $scope.detail.show();
    };

    $scope.closeDetail = function() {
      $scope.detail.hide();
    };

    var vm = this;
  }

})(angular);
