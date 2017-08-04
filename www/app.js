'use strict';

(function (angular) {
  angular
    .module('AddressBookApp', ['ionic', 'Main', 'ionic.cloud', 'ngResource', 'ui.calendar', 'chart.js'])

    .constant('APP_CONSTANT',{
      'APP_ID': '{{yourAppID}}',
      'SENDER_ID': '{{yourSenderID}}',
      'WEB_CLIENT_ID': '{{yourWebClientID}}',
      'API': {
        'BASE_URL': 'https://api.ionic.io',
        'API_TOKEN': '{{yourApiToken}}'
      }
    })

    .config(function ($ionicCloudProvider, $ionicConfigProvider, APP_CONSTANT) {

      //Set no cache view for app ******************
      $ionicConfigProvider.views.maxCache(0);

      //Cloud provider init ************************
      $ionicCloudProvider.init({
        "core": {
          "app_id": APP_CONSTANT.APP_ID
        },
        "auth": {
          "facebook": {
            "scope": ["email", "public_profile"]
          },
          "google": {
            "webClientId": APP_CONSTANT.WEB_CLIENT_ID,
            "scope": ["profile", "email"]
          }
        },
        "push": {
          "sender_id": APP_CONSTANT.SENDER_ID,
          "pluginConfig": {
            "ios": {
              "badge": true,
              "sound": true
            },
            "android": {
              "iconColor": "#343434"
            }
          }
        }
      });

    })

    .run(function ($ionicPlatform, $ionicDeploy) {
      $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        $ionicDeploy.channel = 'dev';

        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);
        }

        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }
      });
    })

})(angular);
