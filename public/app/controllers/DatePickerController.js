app.controller('DatePickerController', datePickerController);

datePickerController.$inject = ['$scope', 'DateService'];

function datePickerController($scope, DateService) {
    $scope.startDate = DateService.startDate;
    $scope.endDate   = DateService.endDate;

    $scope.minDate = new Date(2013, 5, 6);
    $scope.maxDate = new Date(2016, 0, 30);

    $scope.updateDate = function () {
        DateService.startDate = $scope.startDate;
        DateService.endDate = $scope.endDate;
        DateService.dateChanged = true;
    };

    $scope.updateDate();
}