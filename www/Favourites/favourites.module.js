'use strict';

(function (angular) {

angular
    .module('Favourites', [])
    .config(function ($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('logged.favourites', {
          url: '/favourites',
          views: {
            'menuContent': {
              templateUrl: 'Favourites/teplates/favourites.html',
              controller: 'FavouritesController as FavouritesCtrl'
            }
          }
        });

    });

})(angular);
