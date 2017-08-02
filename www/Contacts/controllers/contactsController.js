'use strict';

(function (angular) {

  angular.module('Main')
    .controller('ContactsController', ContactsController);
  ContactsController.$inject =
    ['$scope', '$log', '$state', 'avatarUrlFilter', 'UserService', '$window', 'NotificationCenter', '$ionicPopup', '$ionicModal'];

  function ContactsController($scope, $log, $state, avatarUrlFilter, UserService, $window, NotificationCenter, $ionicPopup, $ionicModal) {

    var vm = this;

    $scope.message = _message;
    $scope.sendNotification = _sendNotification;
    $scope.openDetail = _openDetail;
    $scope.closeDetail = _closeDetail;

    $ionicModal.fromTemplateUrl('Contacts/templates/contacts-list-modal.html', {
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

    function _message(item) {
      $scope.data = {};
      $scope.data.item = item;

      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
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
            text: '<b>Save</b>',
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

        }, function (error) {
          $log.debug(error);
        });
    }

    function _getUserList() {
      UserService.usersList()
        .$promise
        .then(function (response) {
          vm.usersList = response.data
          angular.forEach(vm.usersList, function (item) {
            if (item && item.custom && item.custom.userCustomData && item.custom.userCustomData.gender) {
              item.defImage = avatarUrlFilter(item.custom.userCustomData.gender);
            } else {
              item.defImage = avatarUrlFilter('G');
            }

          }, this);
          $log.debug(response);
        }, function (error) {
          $log.debug(error);
        });
    }

    function _reset() {
      vm.usersList = [];
    }

    function _init() {
      _reset();
      _getUserList();
    }

    _init();
  }

})(angular);
