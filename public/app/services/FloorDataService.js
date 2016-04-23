app.service('floorDataService', function (loadingService, $http, $q, HttpPromise) {
    var self = this;

    self.currentFloorData = {};  // {vav: {date: temp, date2: temp2, ...}, vav: {date: temp, ...}}
    self.currentFloorDates = []; // [2013-06-06 00:00:00", "2013-06-06 01:00:00", ...]
    self.vavs = {};
    self.roomNumbers = {};
    self.weatherData = {};

    self.getRoomNumbers = function getRoomNumbers() {
        return HttpPromise.getRoomNumbers().then(function(data) {
            self.roomNumbers = data;
        });
    };

    self.getVavNumbers = function getVavNumbers() {
        return HttpPromise.getVavNumbers().then(function(data) {
           self.vavs = data;
        });
    };

    self.getWeatherData = function getWeatherData() {
        return HttpPromise.getWeatherData().then(function(data) {
            self.weatherData = data;
        });
    };

    self.getRoomData = function getRoomData() {
        return HttpPromise.getRoomData().then(function(data) {
            self.currentFloorDates = data['Dates'];
            self.currentFloorData = data['Data'];
            loadingService.makingRequest = false;
        });
    };

    self.getAllFloorData = function getAllFloorData() {
        loadingService.makingRequest = true;
        
        var promises = [self.getRoomNumbers(), self.getVavNumbers(),
                        self.getWeatherData(), self.getRoomData()];

        return $q.all(promises);
    }
});