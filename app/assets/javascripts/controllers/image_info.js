AngularApp.controller('ImageInfoCtrl', [
  '$location', '$scope', '$timeout', '$routeParams', 'Image', function($location, $scope, $timeout, $routeParams, Image) {

    var imageId = null;
    imageId = $routeParams.id;
    //console.log(imageId);

    $scope.image = "";
    $scope.setfiles = function(ele) {
      $scope.image = ele.files[0];
      //console.log($scope.image);
    };

    $scope.create = function() {
      var imageModel = null;
      imageModel = $scope.imageInfoModel;
      console.log(imageModel);
      $scope.loading = true;
      // If form having other field then we have to pass two argument and same as pass in service
      //return Image.addImage(imageModel, $scope.image).then(function(image_info) {
      return Image.addImage($scope.image).then(function(image_info) {      
        $scope.loading = false;
        return $location.path('/imageInfos');
        $scope.getImage;
      }, function(error) {
        $scope.loading = false;
        return $scope.imageUpload = error;
      });
    };  

    $scope.getImage = function() {
      $scope.loading = true;
      return  Image.getImage().then(function(data) {
        if(data != null || data != 'undefined') {
          $scope.imageData = data;
        }
      }, function(data) {
        $scope.loading = false;
        return $scope.imageUpload = errors;
      });
    };

    /*$scope.update = function() {
      $scope.loading = true;
      var _id = 7;
      console.log("Data:" + _id);
      return Image.update(_id, $scope.image).then(function(data) {
        $scope.flash_message = 'Your image has been updated.';
        return $location.path('/imageInfos');
        $timeout((function() {
          $scope.flash_message = null;
          return $scope.$digest();
        }), 5000);
        return $scope.loading = false;
      }, function(data) {
        $scope.loading = false;
        return $scope.imageupload = data.errors;
      });
    };*/

  }
]);
