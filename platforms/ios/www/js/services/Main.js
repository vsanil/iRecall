'use strict';

angular.module('angularPassportApp')
.factory('Camera', ['$q', function($q) {
 
  return {
    getPicture: function(options) {
      var q = $q.defer();
      
      // navigator.camera.getPicture(function(result) {
      //   // Do any magic you need
      //   q.resolve(result);
      // }, function(err) {
      //   q.reject(err);
      // }, options);
      
////////////////////////////////////////////////

// navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, destinationType: destinationType.FILE_URI, sourceType:Camera.PictureSourceType.SAVEDPHOTOALBUM});

// var pictureSource;   // picture source
// var destinationType; // sets the format of returned value 
// pictureSource=navigator.camera.PictureSourceType;
// destinationType=navigator.camera.DestinationType;

// function onPhotoURISuccess(imageURI) {
//   // Uncomment to view the image file URI 
//   console.log(imageURI);
//  q.resolve(imageURI);
// }
// // Called if something bad happens.
// function onFail(message) {
// 	alert('Failed because: ' + message);
// 	q.reject(message);
// }

/////////////////////////////////////////////////////
      return q.promise;
    }
  }
}])

