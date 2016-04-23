app.service('datePickerService', function (floorDataService) {
    var self = this;

    self.startDate = undefined;
    self.endDate = undefined;

    self.dateChanged = false;

    self.getStartDate = function () {
        var startDateString = self.startDate.toISOString().substring(0, 10) + ' 00:00:00';
        return floorDataService.currentFloorDates.indexOf(startDateString);
    };

    self.getEndDate = function () {
        var endDateString = self.endDate.toISOString().substring(0, 10) + ' 23:00:00';
        return floorDataService.currentFloorDates.indexOf(endDateString);
    };
});