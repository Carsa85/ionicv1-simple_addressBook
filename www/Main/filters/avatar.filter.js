


'use strict';

(function (angular) {

  angular.module('Main')
    .filter('avatarUrl', function () {
      return function (gender) {
        var avatarUrl;
        switch (gender) {
          case 'M':
            avatarUrl = './img/boyAvatar.png';
            break;

          case 'F':
            avatarUrl = './img/girlAvatar.png';
            break;

          default:
            avatarUrl = './img/genericAvatar.png';
            break;
        }
        return avatarUrl;
      };
    })

})(angular);
