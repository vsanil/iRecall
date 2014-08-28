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
  'ui.bootstrap', 'auth0'])


.config(function($stateProvider, $urlRouterProvider, authProvider, $httpProvider/*, $routeProvider, $locationProvider*/) {
  //AUTH0
  //$httpProvider.interceptors.push('authInterceptor');

  authProvider
  .init({
    domain: 'vsanil.auth0.com',
    clientID: 'Ux3wy1yE8EmsvRJwRdrxERXwilngwHxW',
      callbackURL: location.href,
      loginState: 'login'
    });

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

  .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/auth.html'
      
    })


  .state('app.signin', {
      url: "/signin",
      views: {
        'auth-signin' :{
          templateUrl: "templates/auth-signin.html"
           ,
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
  $urlRouterProvider.otherwise('app/signin');
  //$locationProvider.html5Mode(true);
})

.run(function($ionicPlatform, $rootScope, $location, Auth, auth) {
  //AUTH0
  //auth.hookEvents();

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
  })

    //watching the value of the currentUser variable.
    $rootScope.$watch('currentUser', function(currentUser) {
      // if no currentUser and on a page that requires authorization then try to update it
      // will trigger 401s if user does not have a valid session
      if (!currentUser && (['/app', 'app/signin', 'app/signup'].indexOf($location.path()) == -1 )) {
        Auth.currentUser();
      }
    });

    // On catching 401 errors, redirect to the login page.
    $rootScope.$on('event:auth-loginRequired', function() {
      $location.path('app/signin');
      return false;
    });

});


