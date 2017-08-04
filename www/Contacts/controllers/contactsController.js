'use strict';

(function (angular) {

  angular.module('Main')
    .filter('inArray', function ($filter) {
      return function (list, arrayFilter, element) {
        if (arrayFilter) {
          var idArr = [];
          angular.forEach(arrayFilter, function (item) {
            idArr.push(item[element]);
          });
          return $filter("filter")(list, function (listItem) {
            return (idArr.indexOf(listItem[element]) === -1);
          });
        }
      };
    })
    .controller('ContactsController', ContactsController);
  ContactsController.$inject =
    ['$scope', '$log', '$state', '$timeout', '$ionicUser', 'avatarUrlFilter', 'UserService', '$window', 'NotificationCenter', '$ionicPopup', '$ionicModal'];

  function ContactsController($scope, $log, $state, $timeout, $ionicUser, avatarUrlFilter, UserService, $window, NotificationCenter, $ionicPopup, $ionicModal) {

    var vm = this;

    $scope.message = _message;
    $scope.detail = _detail
    $scope.addUser = _addUser;
    $scope.delete = _delete;
    $scope.changeFavouritsStatus = _changeFavouritsStatus;
    $scope.sendNotification = _sendNotification;
    $scope.openContacts = _openContacts;
    $scope.closeContacts = _closeContacts;

    $ionicModal.fromTemplateUrl('Contacts/templates/contacts-list-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.contacts = modal;
    });

    function _openContacts() {
      $scope.contacts.show();
    };

    function _closeContacts() {
      $scope.contacts.hide();
    };

    function _delete(item) {
      var index = vm.myUsersList.indexOf(item);
      $window.localStorage.setItem('contacts', JSON.stringify(vm.myUsersList));
      vm.myUsersList.splice(index, 1);
    }

    function _addUser(item) {
      $timeout(function () {
        item = setGender(item);
        vm.myUsersList.push(item);
        $window.localStorage.setItem('contacts', JSON.stringify(vm.myUsersList));
        var payload = {
          "user_ids": item.uuid,
          "profile": "addressbook_push",
          "notification": {
            "message": 'Ciao, sei stato aggiunto alla rubrica di '+ vm.yourUser.custom.userCustomData.name
          }
        };
        $scope.sendNotification(payload);
      }, 100);
    }

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

    function _detail(item) {
      $scope.detailItem = item;

      // An elaborate, custom popup
      var detailPopup = $ionicPopup.show({
        templateUrl: 'Contacts/templates/contats-detail-popup.html',
        title: 'Contact detail',
        scope: $scope,
        buttons: [
          {
            text: 'Close',
            type: 'button-assertive'
          }
        ]
      });

    }

    function _changeFavouritsStatus() {
      $window.localStorage.setItem('contacts', JSON.stringify(vm.myUsersList));
    }

    function _sendNotification(payload) {
      NotificationCenter.notificationCreate(payload)
        .then(function (response) {
          $log.debug(response);
        });
    }

    function _getUserList() {
      UserService.usersList()
        .$promise
        .then(function (response) {
          angular.forEach(response.data, function (item) {
            if (item.uuid !== vm.yourUser.uuid) {
              item = setGender(item);
              item.isFavourit = false;
              vm.usersList.push(item);
            }
          }, this);
          $log.debug(response);
        }, function (error) {
          $log.debug(error);
        });
    }

    function _getUser() {
      UserService.user({ "id": $ionicUser.id })
        .$promise
        .then(function (response) {
          response.data = setGender(response.data);
          vm.yourUser = response.data;
          _getUserList();
          $log.debug(response);
        }, function (error) {
          $log.debug(error);
        });
    }

    function setGender(item) {
      if (item && item.custom && item.custom.userCustomData && item.custom.userCustomData.gender) {
        item.defImage = avatarUrlFilter(item.custom.userCustomData.gender);
      } else {
        item.defImage = avatarUrlFilter('G');
      }
      return item;
    }

    function _reset() {
      vm.usersList = [];
      vm.myUsersList = $window.localStorage.getItem('contacts') ? JSON.parse($window.localStorage.getItem('contacts')) : [];
      vm.yourUser = {};
    }

    function _init() {
      _reset();
      _getUser();
    }

    _init();
  }

})(angular);
