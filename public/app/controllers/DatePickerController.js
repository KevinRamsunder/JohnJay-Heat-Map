app.controller('DatePickerController', datePickerController);

datePickerController.$inject = ['$scope', '$rootScope'];

function datePickerController($scope, $rootScope) {
    $rootScope.startDate = new Date(2016, 0, 1);
    $rootScope.endDate   = new Date(2016, 0, 31);

    $rootScope.minDate = new Date(2013, 5, 6);
    $rootScope.maxDate = new Date(2016, 0, 31);

    $rootScope.displayDate = $rootScope.endDate.toISOString().substring(0, 10) + ' 23:00:00';

    $scope.updateDate = function () {
        $rootScope.dateChanged = true;
    };

    $scope.updateDate();
}