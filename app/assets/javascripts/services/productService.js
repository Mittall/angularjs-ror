AngularAppService.factory('Product', [
  '$location', '$http', '$q', function($location, $http, $q) {
    var productVal;
    productVal = null;
    return {
      createProduct: function(pName, pPrice, selected) {
        var deferred;
        deferred = $q.defer();
        $http.post('/api/products', {
          product: {
            pname: pName,
            price: pPrice,
            category_id: selected
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

      deleteProduct: function(pId) {
        var deferred;
        deferred = $q.defer();
        $http({
            method: 'DELETE',
            url: '/api/products/' + pId
        }).success(function(data) {
          return deferred.resolve(data);            
        }).error(function(data) {
          return deferred.reject(data);            
        });   
        return deferred.promise;     
      },
    
      getDataById: function(pId) {
        var deferred;
        deferred = $q.defer();
        $http.get('/api/products/' + pId , {
        }).success(function(data) {
          return deferred.resolve(data);
        }).error(function(data) {
          return deferred.reject(data);
        });
        return deferred.promise;
      },
 
      updateProduct: function(pId, product) {
        var deferred;
        deferred = $q.defer();
        $http.put('/api/products/' + pId , {
          product: {
            pname: product.pname,
            price: product.price
          }
        }).success(function(data) {
          return deferred.resolve(data);
        }).error(function(data) {
          return deferred.reject(data);
        });
        return deferred.promise;
      },

      searchProduct: function() {
        var deferred;
        deferred = $q.defer();
        $http.get('/api/products', {
        }).success(function(data) { 
          return deferred.resolve(data);
        }).error(function(data) { 
          return deferred.reject(data);
        });
        return deferred.promise;
      },

      getproductsFilter: function() {
        var deferred;
        deferred = $q.defer();
        $http.get('/api/products', {
        }).success(function(data) {
          return deferred.resolve(data);
        }).error(function(data){
          return deffered.reject(data);
        });
        return deferred.promise;
      },

      /* --- */
      buy_product: function(product, shoppingModel) {
        var deferred;
        deferred = $q.defer();
        $http.post('/api/shoppings', {
          shopping: {
            product_name : product.pname,
            price : product.price,
            quntity : shoppingModel.quntity
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
      }

    };
  }
]);

      /*getproducts: function() {
        var deferred;
        deferred = $q.defer();
        $http.get('/api/products').success(function(data) {
          return deferred.resolve(data);            
        }).error(function(data) {
          return deferred.reject(data);            
        });   
        return deferred.promise;     
      },  

      getDataById: function(pId) {
        var deferred;
        deferred = $q.defer();
        $http.get('/api/products/' + pId).success(function(data) {
          return deferred.resolve(data);            
        }).error(function(data) {
          return deferred.reject(data);            
        });   
        return deferred.promise;     
      },*/ 
