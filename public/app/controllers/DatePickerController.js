app.controller('DatePickerController', datePickerController);

datePickerController.$inject = ['$scope', 'datePickerService'];

function datePickerController($scope, datePickerService) {
    $scope.startDate = new Date(2016, 0, 1);
    $scope.endDate   = new Date(2016, 0, 31);

    $scope.minDate = new Date(2013, 5, 6);
    $scope.maxDate = new Date(2016, 1, 31);

    $scope.updateDate = function () {
        datePickerService.startDate = $scope.startDate;
        datePickerService.endDate = $scope.endDate;
        datePickerService.dateChanged = true;
    };

    $scope.updateDate();
}