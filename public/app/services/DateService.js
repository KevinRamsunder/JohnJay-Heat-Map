app.service('DateService', function (floorDataService) {
    var self = this;

    self.startDate = undefined;
    self.endDate = undefined;

    self.dateChanged = false;

    // returns the index of the start date in the array of dates
    self.getStartDate = function () {
        var startDateString = self.startDate.toISOString().substring(0, 10) + ' 00:00:00';
        return floorDataService.currentFloorDates.indexOf(startDateString);
    };

    // returns the index of the end date in the array of dates
    self.getEndDate = function () {
        var endDateString = self.endDate.toISOString().substring(0, 10) + ' 23:00:00';
        return floorDataService.currentFloorDates.indexOf(endDateString);
    };

    self.getEndDateString = function () {
        return self.endDate.toISOString().substring(0, 10) + ' 23:00:00';
    }
});