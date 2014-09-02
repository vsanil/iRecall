'use strict';

angular.module('angularPassportApp')
  .controller('SignupCtrl', function ($scope, Auth, $location) {
    $scope.register = function(form) {
      console.log('Hello...');
      //console.log('Hello123: ' + $scope.user.email);
      Auth.createUser({
          email: $scope.user.email,
          username: $scope.user.username,
          password: $scope.user.password
        },
        function(err) {
          $scope.errors = {};

          if (!err) {
            $location.path('/');
          } else {
            angular.forEach(err.errors, function(error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.type;
            });
          }
        }
      );
    };
  });
