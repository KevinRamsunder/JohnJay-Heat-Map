// create and link 'MainController' controller to angular application
app.controller('DatePickerController', datePickerController);

// inject dependencies into 'MainController' controller
datePickerController.$inject = ['$scope', '$http'];

// controller function
function datePickerController($scope, $http) {
    $scope.leftDate = new Date(2016, 0, 5);
    $scope.rightDate = new Date(2016, 0, 27);

    $scope.leftMinDate = new Date(2013, 6, 6);
    $scope.leftMaxDate = $scope.rightDate;
    $scope.rightMinDate = $scope.leftDate;
    $scope.rightMaxDate = new Date(2016, 1, 31);


    $scope.checkDate = function() {
        if ($scope.leftDate.getTime() !== $scope.rightMinDate.getTime()) {
            $scope.rightMinDate = $scope.leftDate;
        }

        if ($scope.rightDate.getTime() !== $scope.leftMaxDate.getTime()) {
            $scope.leftMaxDate = $scope.rightDate;
        }
    };

}