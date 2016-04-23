app.service('DateService', function (floorDataService) {
    var self = this;

    self.startDate = new Date(2016, 0, 1);
    self.endDate = new Date(2016, 0, 30);

    self.dateChanged = false;

    // returns the index of the date in the array of dates
    self.getStartDate = function () {
        var startDateString = self.startDate.toISOString().substring(0, 10) + ' 00:00:00';
        return floorDataService.currentFloorDates.indexOf(startDateString);
    };

    // returns the index of the date in the array of dates
    self.getEndDate = function () {
        var endDateString = self.endDate.toISOString().substring(0, 10) + ' 23:00:00';
        return floorDataService.currentFloorDates.indexOf(endDateString);
    };

    self.getEndDateString = function () {
        return self.endDate.toISOString().substring(0, 10) + ' 23:00:00';
    }
});