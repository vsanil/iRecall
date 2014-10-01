'use strict';

angular.module('angularPassportApp')
.controller('MainCtrl', function($scope, $cordovaCamera, $location, Camera) {
  $scope.image1 = 'http://placekitten.com/g/200/300';

  $scope.takePicture = function() {
    if (typeof (window.cordova) == 'undefined') {
      $scope.image1 = 'http://placekitten.com/g/200/300';
      console.log('Camera not found');
      $location.path('app/new');
    }
    else {
      var options = { 
        quality : 75, 
        destinationType : Camera.DestinationType.DATA_URL, 
        sourceType : Camera.PictureSourceType.CAMERA, 
        allowEdit : true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };
      $cordovaCamera.getPicture(options).then(function(imageURI) {
        $scope.photo = imageURI;
      }, function(err) {
        console.error('Unable to take pic', err);
        alert('Unable to take picture');
      });
    }
  }

  $scope.insertThing = function() {

  }

  $scope.getPhoto = function() {
    return $scope.image1;
  }

  // $scope.getPhoto = function() {
  //   Camera.getPicture().then(function(imageURI) {
  //     console.log(imageURI);
  //     $scope.lastPhoto = imageURI;
  //   }, function(err) {
  //     console.err(err);
  //   }, {
  //     quality: 75,
  //     targetWidth: 320,
  //     targetHeight: 320,
  //     saveToPhotoAlbum: false
  //   });
  // };

})



