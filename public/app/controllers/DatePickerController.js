app.controller('DatePickerController', datePickerController);

datePickerController.$inject = ['$scope', '$rootScope'];

function datePickerController($scope, $rootScope) {
    $scope.date = {
        startDate: moment("2016-01-01"),
        endDate: moment("2016-01-31")
    };

    $scope.opts = {
        minDate: moment("2013-06-06T10:00:00"),
        maxDate: moment("2016-06-31T10:00:00"),
        ranges: {
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()]
        }
    };

    //Watch for date changes
    $scope.$watch('date', function(newDate) {
        $rootScope.dateChanged = true;
        $rootScope.startDate = newDate.startDate.toDate();

        // no fucking clue why I have to subtract by 1 day but it works
        $rootScope.endDate   = newDate.endDate.subtract(1, "days").toDate();

        // console.log("inside watch");
        // console.log(newDate.endDate.toDate());

    }, false);

    // The start date and end date in the date picker
    $rootScope.startDate = new Date(2016, 0, 1);
    $rootScope.endDate   = new Date(2016, 0, 31);

    // Min and Max date of DatePicker
    $rootScope.minDate = new Date(2013, 5, 6);
    $rootScope.maxDate = new Date(2016, 0, 31);

    // Variable that will control the date being displayed on webpage
    $rootScope.displayDate = $rootScope.endDate.toISOString().substring(0, 10) + ' 23:00:00';

    // Keep track if date is changed. When the date is changed
    // the MovieController will set the new date when it is restarted
    $rootScope.dateChanged = false;
}