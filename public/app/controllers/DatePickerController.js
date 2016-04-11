// create and link 'MainController' controller to angular application
app.controller('DatePickerController', datePickerController);

// inject dependencies into 'MainController' controller
datePickerController.$inject = ['$scope', '$http'];

// controller function
function datePickerController($scope, $http) {
    $scope.myDate = new Date("1-31-2016");;
    $scope.minDate = new Date("6-6-2013");
    $scope.maxDate = new Date("1-31-2016");

    $scope.onlyWeekendsPredicate = function (date) {
        var day = date.getDay();
        return day === 0 || day === 6;
    }
}