// create and link 'MainController' controller to angular application
app.controller('DatePickerController', datePickerController);

// inject dependencies into 'MainController' controller
datePickerController.$inject = ['$scope', '$http', 'datePickerService'];

// controller function
function datePickerController($scope, $http, datePickerService) {
    $scope.startDate = new Date(2016, 0, 5);
    $scope.endDate   = new Date(2016, 0, 27);

    $scope.minDate = new Date(2013, 6, 6);
    $scope.maxDate = new Date(2016, 1, 31);

    datePickerService.startDate = $scope.startDate;
    datePickerService.endDate = $scope.endDate;
}