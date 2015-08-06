AngularApp.controller('ProductCtrl', [
  '$location', '$http', '$scope', '$rootScope', '$routeParams', '$timeout', 'Product', 'Category', function($location, $http, $scope, $rootScope, $routeParams, $timeout, Product, Category) {

  $scope.dataval = [];
  var pId = null;
  pId = $routeParams.id;
  $scope.curPage = 0;
  $scope.pageSize = 4;

  //getting list of category
  $scope.getCategories = function() {
    $scope.loading = true;
    return Category.getCategories().then(function(data) {
      if(data != null || data != 'undefined') {
        $scope.categories = data;
      }
    }, function(data) {
      $scope.loading = false;
      return $scope.productError = data.errors;
    });
  };
  
  //set the category id on click
  $scope.showcategory = { };
  $scope.setShowCategory = function(id){
    $scope.showcategory = {category_id: id};
  }

  //get the product data by id 
  $scope.getDataById = function() {
    return Product.getDataById(pId).then(function(data) {
      $scope.product = data;
      $scope.loading = false;
      //console.log($scope.product);
      return $scope.product;
    }, function(data) {
      $scope.loading = false;
    });
  };

  //Add the new product to current list of products
  $scope.create = function() {
    var productdata = null;
    $scope.loading = true;
    productdata = $scope.productModel;
    return Product.createProduct(productdata.pName, productdata.pPrice, productdata.selected).then(function(product) {
      $scope.searchProducts();
      $scope.loading = false;
      return $location.path('/products');
    }, function(error) {
      $scope.loading = false;
      return $scope.productError = error;
    });
  };   

  //Update the particular product
  $scope.updateProduct = function() {
    $scope.loading = true;
    return Product.updateProduct(pId, $scope.product).then(function(data) {
      $scope.flash_message = 'Your product has been updated.';
      return $location.path('/products');
      $timeout((function() {
        $scope.flash_message = null;
        return $scope.$digest();
      }), 5000);
      return $scope.loading = false;
    }, function(data) {
      $scope.loading = false;
      return $scope.editFormError = data.errors;
    });
  };

  //Delete the particular product
  $scope.deleteProduct = function(pId) {
    $scope.loading = true;
    return Product.deleteProduct(pId).then(function(data) {
      $scope.loading = false;
      $scope.searchProducts();
    }, function(data) {
      $scope.loading = false;
      return $scope.deleteProductError = error;
    });
  };

  //Show product by id(this function is in use)
  $scope.getDataById = function() {
    return Product.getDataById(pId).then(function(data) {
      $rootScope.product = data;
      $scope.loading = false;
      //console.log($scope.product);
      return $scope.product;
    }, function(data) {
      $scope.loading = false;
    });
  };

  //Search the perticular product
  $scope.searchProducts = function() {
    return Product.searchProduct().then(function(data) { 
      if (data != null || data != 'undefined') {
        $scope.searchResult = data;
        for (var i = 0; i < data.length; i++) {
          $scope.dataval.push(data[i]);
        }
        $scope.rowsPerPage = 4;
      } 

      $scope.totalItems = 2;
      $scope.currentPage = 1;

      $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
      };

      $scope.pageChanged = function() {
        //$log.log('Page changed to: ' + $scope.currentPage);
      };

      $scope.maxSize = 5;
      $scope.bigTotalItems = 2;
      $scope.bigCurrentPage = 1;

      $scope.numberOfPages = function() {
		    return Math.ceil($scope.searchResult.length / $scope.pageSize);
	    }
    }, function(data) {
      $scope.loading = false;
      return $scope.editFormError = data.errors;
    });
  };

  //Display list of products
  function getproducts() {
    $http.get('/api/products').success(function(data) {
      if (data != null || data != 'undefined') {
        $scope.products = data;
        //console.log($scope.products);
      }
    }).error(function (error) {
      $scope.status = 'Unable to retrieve product' + error.message;
    });
  };

  //Return the collection of unique price
  $scope.uniquePrices = function (data, key) {
    var result = [];
    for (var i = 0; i < data.length; i++) {
      var value = data[i][key];
      if (result.indexOf(value) == -1) {
        result.push(value);
      }
    }
    return result;
  };

  //filter the data base on price checkbox selection
  $scope.getproductsFilter = function() {
    return Product.getproductsFilter().then(function(data) {
      if (data != null || data != 'undefined') {
        $scope.products = data;
        $scope.productPrice = {};

        // Watch the price that are selected
        $scope.$watch(function () {
          return {
            products: $scope.products,
            productPrice: $scope.productPrice
          }
        }, function (value) {
          var selected;
          $scope.count = function (prop, value) {
            return function (el) {
              return el[prop] == value;
            };
          };
          
          $scope.priceGroup = $scope.uniquePrices($scope.products, 'price');
          var filterAfterPrice = [];        
          selected = false;
          for (var j in $scope.products) {
            var p = $scope.products[j];
            for (var i in $scope.productPrice) {
              if ($scope.productPrice[i]) {
                selected = true;
                  if (i == p.price) {
                    filterAfterPrice.push(p);
                    break;
                  }
               }
            }        
          }
          if (!selected) {
            filterAfterPrice = $scope.products;
          }
          $scope.filteredProducts = filterAfterPrice;        
        }, true);
      
        $scope.$watch('filtered', function (newValue) {
          if (angular.isArray(newValue)) {
            console.log(newValue.length);
          }
        }, true);    
      }        
    });
  }; 

  $scope.person = {
    firstName: "John",
    lastName: "Doe"
  };

  var oriPerson = angular.copy($scope.person);

  $scope.resetForm = function ()
  {
    $scope.person = angular.copy(oriPerson);
    $scope.personForm.$setPristine();
  };

  $scope.isPersonChanged = function ()
  {
    return !angular.equals($scope.person, oriPerson);
  };

  $scope.buy_product = function() {
    return Product.buy_product($rootScope.product, $scope.shoppingModel).then(function(shopping) {
      $scope.loading = false;      
    }, function(error) { 
      $scope.loading = false;
      return $scope.shoppingError = error;
    });
  };
  
  }
]);


    /*$scope.getDataById = function(pId) {
      $scope.loading = true;
      return Product.getDataById(pId).then(function(data) {
        $scope.products = data;
        $scope.flash_message = 'Your product has been updated.';
        return $scope.product;
        $timeout((function() {
          $scope.flash_message = null;
          return $scope.$digest();
        }), 5000);
        return $scope.loading = false;
      }, function(data) {
        $scope.loading = false;
      });
    };*/

    /*$scope.getproducts = function() {
      $scope.loading = true;
      return Product.getproducts().then(function(data) {
        $scope.products = data;
        console.log($scope.products);
        $scope.flash_message = 'Your product has been updated.';
        return $location.path('/products');
        $timeout((function() {
          $scope.flash_message = null;
          return $scope.$digest();
        }), 5000);
        return $scope.loading = false;
      }, function(data) {
        $scope.loading = false;
      });
    };*/

    //Show product by id 
    /*function getProductsById(pId) {
      $http.get('/api/products/' + pId).success(function(data) {
        if (data != null || data != 'undefined') {
          $scope.product = data;
        }
      }).error(function (error) {
        $scope.status = 'Unable to retrieve product' + error.message;
      });
    };*/

    /*this.isHidden = false;
    this.fadeIt = function() {
        this.isHidden = !this.isHidden;
    };*/
    

