AngularApp.controller('SlideCtrl', ['$scope', '$timeout', function($scope, $timeout) {
        $scope.slides = [
            {image: '/assets/img00.jpg', description: 'Image 00'},
            {image: '/assets/img01.jpg', description: 'Image 01'},
            {image: '/assets/img02.jpg', description: 'Image 02'},
            {image: '/assets/img03.jpg', description: 'Image 03'},
            {image: '/assets/img04.jpg', description: 'Image 04'}
        ];
        /* */
        var timer;
        $scope.sliderFunc = function() {
          timer = $timeout(function() {
            $scope.nextSlide();
            timer = $timeout($scope.sliderFunc, 1000);
          }, 1000);
        };
        /* */
        $scope.direction = 'left';
        $scope.currentIndex = 0;

        $scope.setCurrentSlideIndex = function (index) {
            $scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
            $scope.currentIndex = index;
        };

        $scope.isCurrentSlideIndex = function (index) {
            return $scope.currentIndex === index;
        };

        $scope.prevSlide = function () {
            $scope.direction = 'left';
            $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
        };
        $scope.sliderFunc;
        $scope.nextSlide = function () {
            $scope.direction = 'right';
            $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
        };

  }
]);
