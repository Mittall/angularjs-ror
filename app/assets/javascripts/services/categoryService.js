AngularAppService.factory('Category', [
  '$location', '$http', '$q', function($location, $http, $q) {
    var categoryVal;
    categoryVal = null;
    return {
      createCategory: function(cname) {
        var deferred;
        deferred = $q.defer();
        $http.post('/api/categories', {
          category: {
            cname: cname,
          }
        }).success(function(data) {
          if (data.id) {
            categoryVal = data;
            return deferred.resolve(categoryVal);
          } else {
            return deferred.reject(data);
          }
        }).error(function(data) {
          return deferred.reject(data);
        });
        return deferred.promise;
      },

      getCategories: function() {
        var deferred;
        deferred = $q.defer();
        $http.get('/api/categories', {
        }).success(function(data) { 
          return deferred.resolve(data);
        }).error(function(data) { 
          return deferred.reject(data);
        });
        return deferred.promise;
      }

    };
  }
]);
