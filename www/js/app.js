// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('angularPassportApp', [
  'ionic',
  'http-auth-interceptor', 
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

// .run(function ($rootScope, $location, Auth) {

//     //watching the value of the currentUser variable.
//     $rootScope.$watch('currentUser', function(currentUser) {
//       // if no currentUser and on a page that requires authorization then try to update it
//       // will trigger 401s if user does not have a valid session
//       if (!currentUser && (['/', '/signin', '/signup'].indexOf($location.path()) == -1 )) {
//         Auth.currentUser();
//       }
//     });

//     // On catching 401 errors, redirect to the login page.
//     $rootScope.$on('event:auth-loginRequired', function() {
//       $location.path('/login');
//       return false;
//     });
//   })

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    // .state('app', {
    //   url: "/app",
    //   //abstract: true,
    //   templateUrl: "templates/auth-signin.html",
    //   controller: 'LoginCtrl'
    // })

  .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/auth.html'
      
    })
  // .state('app.signin', {
  //     url: '/signin',
  //     views: {
  //       'signin': {
  //         templateUrl: 'templates/auth-signin.html',
  //         controller: 'SignInCtrl'
  //       }
  //     }
  //   })

  .state('app.signin', {
      url: "/signin",
      views: {
        'auth-signin' :{
          templateUrl: "templates/auth-signin.html",
          controller: 'LoginCtrl'
        }
      }
    })

    .state('app.signup', {
      url: '/signup',
      views: {
        'auth-signup': {
          templateUrl: 'templates/auth-signup.html',
          controller: 'SignupCtrl'
        }
      }
    })

    .state('app.login', {
      url: "/login",
      views: {
        'menuContent' :{
          templateUrl: "templates/login.html"

        }
      }
    })

    .state('app.search', {
      url: "/search",
      views: {
        'menuContent' :{
          templateUrl: "templates/search.html"
        }
      }
    })

    .state('app.browse', {
      url: "/browse",
      views: {
        'menuContent' :{
          templateUrl: "templates/browse.html"
        }
      }
    })
    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

    .state('app.single', {
      url: "/playlists/:playlistId",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlist.html",
          controller: 'PlaylistCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/app/Search');
  $urlRouterProvider.otherwise('/app/signin');
});

