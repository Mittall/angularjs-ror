AngularApp.controller('TestCrtl', function ($scope) {
    $scope.testValues = [];
    for (var i = 0; i < 100000; i++) {
        $scope.testValues.push(i);
    }
    $scope.rowsPerPage = 50;
});
