// create and link 'MainController' controller to angular application
app.controller('DatePickerController', datePickerController);

// inject dependencies into 'MainController' controller
datePickerController.$inject = ['$scope', 'datePickerService'];

// controller function
function datePickerController($scope, datePickerService) {
    $scope.startDate = new Date(2016, 0, 5);
    $scope.endDate   = new Date(2016, 0, 27);

    $scope.minDate = new Date(2013, 5, 6);
    $scope.maxDate = new Date(2016, 1, 31);

    $scope.updateDate = function () {
        datePickerService.startDate = $scope.startDate;
        datePickerService.endDate = $scope.endDate;
        datePickerService.dateChanged = true;
    };

    $scope.updateDate();
}