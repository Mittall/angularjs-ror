AngularAppService.factory('Image', [
  '$location', '$http', '$q', function($location, $http, $q) {
    var imageVal;
    imageVal = null;
    return {
      //addImage: function(image, imageModel) {
      addImage: function(image) {
        var deferred;
        deferred = $q.defer();
        payload = new FormData();
        console.log(image);
        //We pass the payload string in api/v1/controller as parameter here 'file' pass as params[:file] in controller
        payload.append("file", image);
        //payload.append ("image_info", angular.toJson(imageModel))

        $http.post('/api/image_infos', 
          payload,{
           headers: {
              "Content-Type": void 0  // or [Content-Type": false]
            },
            transformRequest: function(tdata) {
              return tdata;
            }
        }).success(function(data) {
          if (data.id) {
            imageVal = data;
            return deferred.resolve(imageVal);
          } else {
            return deferred.reject(data);
          }
        }).error(function(data) {
          return deferred.reject(data);
        });
        return deferred.promise;
      },

      getImage: function() {
        var deferred;
        deferred = $q.defer();
        $http.get('/api/image_infos', {
        }).success(function(data) { 
          return deferred.resolve(data);
        }).error(function(data) { 
          return deferred.reject(data);
        });
        return deferred.promise;
      },

     /*update: function(_id, image) {
        var deferred;
        deferred = $q.defer();
        payload = new FormData();
        console.log(image);
        payload.append("file", image);

        $http.put('/api/image_infos/' + imageId , 
          payload,{
          image_info: {
            file: image
          },
           headers: {
              "Content-Type": void 0  // or [Content-Type": false]
            },
            transformRequest: function(tdata) {
              return tdata;
            }
        }).success(function(data) {
          if (data.id) {
            //imageVal = data;
            return deferred.resolve(data);
          } else {
            return deferred.reject(data);
          }
        }).error(function(data) {
          return deferred.reject(data);
        });
        return deferred.promise;
      }*/

    };
  }
]);


/*
createProduct: function(productModel, photo) {
        var deferred;
        deferred = $q.defer();
        payload = new FormData()
        payload.append("photo", photo)
         //console.log(payload);
        payload.append ("product", angular.toJson(productModel))
        //console.log(payload);
        $http.post('/api/products', 
          payload,{
           headers: {
              "Content-Type": void 0  // or [Content-Type": false]
            },
            transformRequest: function(tdata) {
              return tdata;
            }
        }).success(function(data) {
          if (data.id) {
            productVal = data;
            return deferred.resolve(productVal);
          } else {
            return deferred.reject(data);
          }
        }).error(function(data) {
          return deferred.reject(data);
        });
        return deferred.promise;
      },
 */
