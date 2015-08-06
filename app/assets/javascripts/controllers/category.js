AngularApp.controller('CategoryCtrl', ['$scope', '$location' , '$http', '$routeParams', 'Category', 
  function($scope, $location, $http, $routeParams, Category) {

    getcategories();

    $scope.create = function (){
      var categoryData = null;
      $scope.loading = true;
      categoryData = $scope.categoryModel;
      return Category.createCategory(categoryData.cname).then(function(category) {
        $scope.loading = false;
        return $location.path('/categories');        
     }, function(error) { 
        $scope.loading = false;
        return $scope.categoryError = error;
      });
    };

    function getcategories() {
      $http.get('/api/categories').success(function(data) {
        if (data != null || data != 'undefined') {
          $scope.categories = data;
        }
      }).error(function (error) {
        $scope.status = 'Unable to retrieve product' + error.message;
      });
    };

  }
]);
