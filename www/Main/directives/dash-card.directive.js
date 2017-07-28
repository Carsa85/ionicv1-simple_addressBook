'use strict';

(function (angular) {

  angular
    .module('Main')
    .directive('dashCard', ['$log', function ($log) {
      return {
        restrict: 'E',
        scope: {
          title: "@",
          bedge: "@",
          cardType: "@",
          bgIcon: "@"
        },
        templateUrl: 'Main/directives/templates/dash-card.html',
        controller: 'dashCardCtrl'
      };

    }])
    .controller('dashCardCtrl', ['$scope', '$log', function ($scope, $log) {
      $log.debug($scope);

      $scope.setBadge = _setBadge;

      function _setBadge () {

        if (parseInt($scope.bedge) > 99) {
          $scope.bedge = "+99";
        }
        return $scope.bedge;
      }

    }]);

})(angular);
