'use strict';

(function (angular) {

  angular.module('Main')
    .controller('CalendarController', CalendarController);
  CalendarController.$inject =
    ['$scope', '$log', '$state', '$window', '$ionicPopup', 'NotificationCenter'];

  function CalendarController($scope, $log, $state, $window, $ionicPopup, NotificationCenter) {

    var vm = this;

    $scope.eventsF = _eventsF;
    $scope.remove = _remove;
    $scope.editEvent = _editEvent;
    $scope.sendNotification = _sendNotification;

    /* event source that calls a function on every view switch */
    function _eventsF(start, end, timezone, callback) {
      var s = new Date(start).getTime() / 1000;
      var e = new Date(end).getTime() / 1000;
      var m = new Date(start).getMonth();
      var events = [{ title: 'Feed Me ' + m, start: s + (50000), end: s + (100000), allDay: false, className: ['customFeed'] }];
      callback(events);
    };

    function _editEvent() {
      $scope.data = {};

      var eventPopup = $ionicPopup.show({
        templateUrl: 'Calendar/templates/calendar-event-popup.html',
        title: 'Create event',
        subTitle: 'Create a event end invite your contact',
        scope: $scope,
        buttons: [
          {
            text: 'Close',
            type: 'button-assertive'
          },
          {
            text: 'Add',
            type: 'button-positive',
            onTap: function (e) {
              var payload = {};
              payload.profile = "addressbook_push";
              payload.notification = {};

              if ($scope.data.title) {
                angular.forEach($scope.contactList, function (c) {
                  if (c.checked) {
                    payload.user_ids = c.uuid;
                    payload.notification.message = 'invitation:' + $scope.data.title + '<br><br>' + $scope.data.message + '<br><br>Start at:' + $scope.data.start + '<br>End at:' + $scope.data.start;

                    $scope.sendNotification(payload);
                  }
                });

                _addEvent($scope.data.start, $scope.data.end, $scope.data.message, $scope.data.title);

              }

            }
          }
        ]
      });
    }

    /* add custom event*/
    function _addEvent(startDate, EndDate, message, title) {
      $scope.events.push({
        title: title,
        message: message,
        start: startDate,
        end: EndDate,
        className: ['openSesame']
      });
      $window.localStorage.setItem('events', JSON.stringify($scope.events));
    }

    function _sendNotification(payload) {
      NotificationCenter.notificationCreate(payload)
        .then(function (response) {
          $log.debug(response);
        });
    }

    /* remove event */
    function _remove(index) {
      $scope.events.splice(index, 1);
    }

    function _setUserList() {
      var user = $window.localStorage.getItem('contacts') ? JSON.parse($window.localStorage.getItem('contacts')) : [];
      var list = [];

      angular.forEach(user, function (u) {
        var item = {
          text: '',
          uuid: u.uuid,
          checked: false
        }

        switch (u.type) {
          case 'facebook':
            item.text = u.social.facebook.data.full_name;
            break;

          default:
            item.text = u.custom.userCustomData.name + ' ' + u.custom.userCustomData.surname;
            break;
        }

        list.push(item);

      });

      return list;

    }

    function _reset() {
      $scope.uiConfi = {};
      $scope.events = [];
      $scope.eventSource = {};
    }

    function _init() {
      _reset();

      $scope.contactList = _setUserList();
      /* config object */
      $scope.uiConfig = {
        calendar: {
          height: 450,
          editable: true,
          header: {
            left: 'month basicWeek basicDay agendaWeek agendaDay',
            center: 'title',
            right: 'today prev,next'
          },
          eventClick: $scope.alertEventOnClick,
          eventDrop: $scope.alertOnDrop,
          eventResize: $scope.alertOnResize
        }
      };

      $scope.eventSource = {
        //url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
      };
      /* event source that contains custom events on the scope */
      $scope.events = $window.localStorage.getItem('events') ? JSON.parse($window.localStorage.getItem('events')) : [];

      $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
    }

    _init()

  }

})(angular);
