app.controller('DatePickerController', datePickerController);

datePickerController.$inject = ['$scope', '$rootScope'];

function datePickerController($scope, $rootScope) {

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