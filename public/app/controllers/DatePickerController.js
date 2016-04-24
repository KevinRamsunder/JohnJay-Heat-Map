app.controller('DatePickerController', datePickerController);

datePickerController.$inject = ['$scope', 'DateService'];

function datePickerController($scope, DateService) {
    $scope.startDate = new Date(2016, 0, 1);
    $scope.endDate   = new Date(2016, 0, 31);

    $scope.minDate = new Date(2013, 5, 6);
    $scope.maxDate = new Date(2016, 0, 31);

    $scope.updateDate = function () {
        DateService.startDate = $scope.startDate;
        DateService.endDate = $scope.endDate;
        DateService.dateChanged = true;
    };

    $scope.updateDate();
}