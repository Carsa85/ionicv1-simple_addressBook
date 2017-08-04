'use strict';

(function (angular) {

  angular.module('Main')
    .controller('FavouritesController', FavouritesController);
  FavouritesController.$inject =
    ['$scope', '$log', '$state', '$window', 'NotificationCenter', '$ionicPopup'];

  function FavouritesController($scope, $log, $state, $window, NotificationCenter, $ionicPopup) {

    var vm = this;

    vm.init = _init;

    $scope.delFromFavourits = _delFromFavourits;
    $scope.message = _message;
    $scope.sendNotification = _sendNotification;

    function _message(item) {
      $scope.data = {};
      $scope.data.item = item;

      // An elaborate, custom popup
      var messagePopup = $ionicPopup.show({
        template: '<textarea class="padding" ng-model="data.message" rows="4" cols="50" placeholder="Insert message"></textarea>',
        title: 'Send message',
        subTitle: 'write something',
        scope: $scope,
        buttons: [
          {
            text: 'Cancel',
            type: 'button-assertive'
          },
          {
            text: '<b>Send</b>',
            type: 'button-positive',
            onTap: function (e) {
              var payload = {
                "user_ids": $scope.data.item.uuid,
                "profile": "addressbook_push",
                "notification": {
                  "message": $scope.data.message
                }
              };
              $scope.sendNotification(payload);
            }
          }
        ]
      });

    }

    function _sendNotification(payload) {
      NotificationCenter.notificationCreate(payload)
        .then(function (response) {
          $log.debug(response);
        });
    }

    function _delFromFavourits() {
      $window.localStorage.setItem('contacts', JSON.stringify(vm.favouritesList));
    }

    function _init() {
      vm.favouritesList = $window.localStorage.getItem('contacts') ? JSON.parse($window.localStorage.getItem('contacts')) : [];
    }
    _init();
  }

})(angular);
