//= require jquery.min
//= require twitter/bootstrap
//= require bootstrap-datepicker
//= require angular
//= require angular-route
//= require angular-resource
//= require angular-blocks
//= require ui-bootstrap-custom-tpls-0.12.0.min.js
//= require setup
//= require_directory ./controllers
//= require_directory ./services
//= require_directory ./filters
//= require directives/bootstrapDirectives
//= require directives/formDirectives
//= require directives/jQueryDirectives

AngularApp.config([
  "$httpProvider", function($httpProvider) {
    var interceptor;
    $httpProvider.defaults.headers.common["X-CSRF-Token"] = $("meta[name=csrf-token]").attr("content");
    interceptor = [
      "$location", "$rootScope", "$q", function($location, $rootScope, $q) {
        var error, success;
        success = function(response) {
          return response;
        };
        error = function(response) {
          if (response.status === 401) {
            $rootScope.$broadcast("event:unauthorized");
            return $q.reject(response);
          }
        };
        return function(promise) {
          return promise.then(success, error);
        };
      }
    ];
    return $httpProvider.responseInterceptors.push(interceptor);
  }
]);

AngularApp.config([
  "$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
    return $routeProvider.when("/", {
      templateUrl: "/home/index.html",
      controller: 'HomeCtrl'
    }).when("/profile/", {
      templateUrl: "/profile/index.html",
      controller: 'ProfileCtrl'
    }).when("/login", {
      templateUrl: "/home/login.html",
      controller: 'HomeBaseCtrl'
    }).when("/signup", {
      templateUrl: "/home/signup.html",
      controller: 'HomeBaseCtrl'
    }).when("/logout", {
      templateUrl: "/home/logout.html",
      controller: 'LogoutCtrl'
    }).when("/verify", {
      templateUrl: "/home/verify.html",
      controller: 'HomeBaseCtrl'
    }).when("/verify/:token", {
      templateUrl: "/home/verify.html",
      controller: 'HomeBaseCtrl'
    }).when("/changepassword", {
      templateUrl: "/profile/changepassword.html",
      controller: 'ProfileCtrl'
    }).when("/resetpassword", {
      templateUrl: "/profile/resetpassword.html",
      controller: 'ProfileCtrl'
    }).when("/resetpassword/:token", {
      templateUrl: "/profile/updatepassword.html",
      controller: 'ProfileCtrl'
    }).when("/product", {
      templateUrl: "/product/create.html",
      controller: 'ProductCtrl'
    }).when("/productUpdate/:id", {
      templateUrl: "/product/updateProduct.html",
      controller: 'ProductCtrl'
    }).when("/productDelete/:id", {
      templateUrl: "/product/index.html",
      controller: 'ProductCtrl'
    }).when("/productShow/:id", {
      templateUrl: "/product/show.html",
      controller: 'ProductCtrl'
    }).when("/products", {
      templateUrl: "/product/index.html",
      controller: 'ProductCtrl'
    }).when("/productsFilter", { 
      templateUrl: "/product/priceFilter.html",
      controller: 'ProductCtrl'
    }).when("/test", { 
      templateUrl: "/test/paginationControl.html",
      controller: 'TestCrtl'
    }).when("/map", { 
      templateUrl: "/mapDisplay/map.html",
      controller: 'MapDisplayCtrl'
    }).when("/yourPlace", { 
      templateUrl: "/mapDisplay/yourPlace.html",
      controller: 'MapDisplayCtrl'
    }).when("/searchPlace", { 
      templateUrl: "/mapDisplay/searchPlace.html",
      controller: 'MapDisplayCtrl'
    }).when("/calculateDistance", {
      templateUrl: "/mapDisplay/calculateDistance.html",
      controller: "MapDisplayCtrl"
    }).when("/slide", {
      templateUrl: "/slide/index.html",
      controller: "SlideCtrl"
    }).when("/category", {
      templateUrl: "/categories/create.html",
      controller: 'CategoryCtrl'
    }).when("/categories", {
      templateUrl: "/categories/index.html",
      controller: 'CategoryCtrl'
    }).when("/categoryViseProducts", {
      templateUrl: "/product/category_product.html",
      controller: 'ProductCtrl'
    }).when("/imageInfo", {
      templateUrl: "/image_info/index.html",
      controller: 'ImageInfoCtrl'
    }).when("/imageInfos", {
      templateUrl: "/image_info/viewAll.html",
      controller: 'ImageInfoCtrl'
    }).when("/imageUpdate/:id", {
      templateUrl: "/image_info/update.html",
      controller: 'ImageInfoCtrl'
    });
  }
]);
