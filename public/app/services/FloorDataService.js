app.service('floorDataService', function (LoadingService, $http, $q) {
    var self = this;

    self.currentFloorData = {};  // {vav: {date: temp, date2: temp2, ...}, vav: {date: temp, ...}}
    self.currentFloorDates = []; // [2013-06-06 00:00:00", "2013-06-06 01:00:00", ...]
    self.vavs = {};
    self.roomNumbers = {};
    self.weatherData = {};

    self.getCoordinates = function getCoordinates(floorLevel) {
        return $http.post('/api/v1/coordinates', {'floorLevel': floorLevel}).then(function(response) {
            self.roomNumbers = response.data['room_num'];
            self.vavs = response.data['vav'];
        });
    };

    self.getRoomData = function getRoomData(floorLevel) {
        return $http.post('/api/v1/rooms', {'floorLevel': floorLevel}).then(function(response) {
            self.currentFloorDates = response.data['Dates'];
            self.currentFloorData = response.data['Data'];
            LoadingService.makingRequest = false;
        });
    };

    self.getWeatherData = function getWeatherData() {
        return $http.get('/api/v1/weather-data').then(function(response) {
            self.weatherData = response.data;
        });
    };

    self.getAllFloorData = function getAllFloorData(floorLevel) {
        LoadingService.makingRequest = true;
        
        var promises = [self.getCoordinates(floorLevel), self.getRoomData(floorLevel),
            self.getWeatherData()];

        return $q.all(promises);
    }
});