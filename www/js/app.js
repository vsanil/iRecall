'use strict';
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
  'ngCordova',
  'ui.bootstrap' /*, 'auth0'*/])

.config(function($stateProvider, $urlRouterProvider, $httpProvider /*authProvider, $routeProvider, $locationProvider*/) {
  //AUTH0
  //$httpProvider.interceptors.push('authInterceptor');

  // authProvider
  // .init({
  //   domain: 'vsanil.auth0.com',
  //   clientID: 'Ux3wy1yE8EmsvRJwRdrxERXwilngwHxW',
  //     callbackURL: location.href,
  //     loginState: 'login'
  //   });

  $stateProvider

  // AUTH0
  // .state('login', {
  //     url: '/login',
  //     templateUrl: 'templates/login-auth.html',
  //     controller: 'LoginCtrl',
  //   })
  //   // Your app states
  //   .state('tab', {
  //     url: "/tab",
  //     abstract: true,
  //     templateUrl: "templates/tabs.html",
  //     // This state requires users to be logged in
  //       // If they're not they'll be redirected to the login state
  //     data: {
  //       requiresLogin: true
  //     }
  //   })

// .state('/', {
//       url: '/',
//       templateUrl: 'templates/main.html',
//       controller: 'MainCtrl'
//     })

  .state('auth', {
      url: '/auth',
      abstract: true,
      templateUrl: 'templates/auth-tab.html'
    })
  .state('auth.forgot', {
      url: "/forgot",
      views: {
        'auth-forgot' :{
          templateUrl: "templates/auth-forgot.html",
           controller: 'LoginCtrl'
        }
      }
    })
  .state('auth.signin', {
      url: "/signin",
      views: {
        'auth-signin' :{
          templateUrl: "templates/auth-signin.html",
           controller: 'LoginCtrl'
        }
      }
    })
    .state('auth.signup', {
      url: '/signup',
      views: {
        'auth-signup': {
          templateUrl: 'templates/auth-signup.html',
          controller: 'SignupCtrl'
        }
      }
    })

  .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/app-tab.html'
      //,
      //controller: 'NavbarCtrl'
    })
    // .state('app', {
    //             url: "/app",
    //             abstract: true,
    //             templateUrl: "templates/menu.html",
    //             controller: 'NavbarCtrl'
    // })
    .state('app.search', {
      url: "/search",
      views: {
        'app-search' :{
          templateUrl: "templates/app-search.html"
          // ,
          // controller: 'SignupCtrl'
        }
      }
    })
    .state('app.new', {
      url: "/new",
      views: {
        'app-new' :{
          templateUrl: "templates/app-new.html"
            //,
            //controller: 'MainCtrl'
        }
      }
    });

    // .state('app.logout', {
    //   url: "/logout",
    //   views: {
    //     'menuContent' : {
    //       templateUrl: "templates/auth-signin.html",
    //      controller: "NavbarCtrl"
    //     }
    //   } 
    // });
    // .state('app.single', {
    //   url: "/playlists/:playlistId",
    //   views: {
    //     'menuContent' :{
    //       templateUrl: "templates/playlist.html",
    //       controller: 'PlaylistCtrl'
    //     }
    //   }
    // });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('auth/signin');
  //$locationProvider.html5Mode(true);
})

.run(function($ionicPlatform, $rootScope, $location, $window, Auth/*, auth*/) {
  //AUTH0
  //auth.hookEvents();
  
  //alert('inside run...' + $ionicPlatform);
  $ionicPlatform.ready(function() {
    //camera
     //alert('inside ready...');
     //alert('>>> ' + window.cordova.plugins.Camera);
     if(window.cordova && window.cordova.plugins.Camera) {
      alert('camera found');
      pictureSource=navigator.camera.PictureSourceType;
      destinationType=navigator.camera.DestinationType;
    }

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      alert('keyboard found');
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      alert('statusbar found');
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

    //alert('before watch...' + currentUser);

    //watching the value of the currentUser variable.
    $rootScope.$watch('currentUser', function(currentUser) {
      // if no currentUser and on a page that requires authorization then try to update it
      // will trigger 401s if user does not have a valid session
      if (!currentUser && (['/', 'auth/signin', 'auth/signout', 'auth/signup'].indexOf($location.path()) == -1 )) {
        Auth.currentUser();
      }
    });

//alert('before on...');
    // On catching 401 errors, redirect to the login page.
    $rootScope.$on('event:auth-loginRequired', function() {
      $location.path('auth/signin');
      return false;
    });

    // $location.path('auth/signin');
    // $rootScope.$apply();

});

// .run(function($ionicPlatform, $rootScope, $location, Auth/*, auth*/) {
//   //AUTH0
//   //auth.hookEvents();
  
//   alert('inside run...' + $ionicPlatform);
//   $ionicPlatform.ready(function() {
//     //camera
//      alert('inside ready...');
//      alert('>>> ' + window.cordova);
//      if(window.cordova && window.cordova.plugins.Camera) {
//       alert('camera found');
//       pictureSource=navigator.camera.PictureSourceType;
//       destinationType=navigator.camera.DestinationType;
//     }

//     // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
//     // for form inputs)
//     if(window.cordova && window.cordova.plugins.Keyboard) {
//       alert('keyboard found');
//       cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
//     }
//     if(window.StatusBar) {
//       alert('statusbar found');
//       // org.apache.cordova.statusbar required
//       StatusBar.styleDefault();
//     }
//   });

//     alert('before watch...' + currentUser);

//     //watching the value of the currentUser variable.
//     $rootScope.$watch('currentUser', function(currentUser) {
//       // if no currentUser and on a page that requires authorization then try to update it
//       // will trigger 401s if user does not have a valid session
//       if (!currentUser && (['/', 'auth/signin', 'auth/signout', 'auth/signup'].indexOf($location.path()) == -1 )) {
//         Auth.currentUser();
//       }
//     });

// alert('before on...');
//     // On catching 401 errors, redirect to the login page.
//     $rootScope.$on('event:auth-loginRequired', function() {
//       $location.path('auth/signin');
//       return false;
//     });

// });


