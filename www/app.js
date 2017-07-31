'use strict';

(function (angular) {
  angular
    .module('AddressBookApp', ['ionic', 'Main', 'ionic.cloud'])

    .config(function ($ionicCloudProvider) {
      $ionicCloudProvider.init({
        "core": {
          "app_id": "47e3da91"
        },
        "auth": {
          "facebook": {
            "scope": ["email", "public_profile"]
          },
          "google": {
            "webClientId": "WEB_CLIENT_ID",
            "scope": ["profile", "email"]
          }
        }
      });
    })

    .run(function ($ionicPlatform) {
      $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
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
