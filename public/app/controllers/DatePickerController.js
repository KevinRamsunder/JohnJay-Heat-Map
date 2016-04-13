// create and link 'MainController' controller to angular application
app.controller('DatePickerController', datePickerController);

// inject dependencies into 'MainController' controller
datePickerController.$inject = ['$scope', '$http'];

// controller function
function datePickerController($scope, $http) {
    $scope.myDate = new Date(2016, 1, 31);
    $scope.minDate = new Date(2013, 6, 6);
    $scope.maxDate = new Date(2016, 1, 31);
}