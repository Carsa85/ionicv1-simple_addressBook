'use strict';

(function (angular) {

  angular.module('Main')
    .controller('FavouritesController', FavouritesController);
  FavouritesController.$inject =
    ['$scope', '$log', '$state'];

  function FavouritesController($scope, $log, $state) {

    var vm = this;
  }

})(angular);
