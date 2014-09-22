'use strict';

angular.module('angularPassportApp')
  .controller('LoginCtrl', function ($scope, Auth, $location) {
    $scope.error = {};
    $scope.user = {};

    $scope.login = function(form) {
      Auth.login('password', {
          'email': $scope.user.email,
          'password': $scope.user.password
        },
        function(err) {
          $scope.errors = {};

          if (!err) {
            $location.path('/app/search');
          } else {
            angular.forEach(err.errors, function(error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.type;
            });
            $scope.error.other = err.message;
          }
      });
    };
  });

//AUTH0
//   .controller('LoginCtrl', function($scope, auth, $state) {
//   auth.signin({
//     // This is a must for mobile projects
//     popup: true,
//     // Make the widget non closeable
//     standalone: true,
//     // This asks for the refresh token
//     // So that the user never has to log in again
//     offline_mode: true,
//     device: 'Phone'
//   }, function() {
//     // Login was successful
//     $state.go('tab.dash');
//   }, function(error) {
//     // Oops something went wrong during login:
//     console.log("There was an error logging in", error);
//   });
// })