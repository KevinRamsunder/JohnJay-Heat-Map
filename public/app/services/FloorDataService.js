app.service('FloorDataService', function (LoadingService, $http, $q) {
    var self = this;

    self.currentFloorDates = []; // [2013-06-06 00:00:00", "2013-06-06 01:00:00", ...]
    self.weatherData = {};       // {"2013-01-01 01:00:00": "37.04", ...}
    
    self.currentFloorData = {};  // {vav: {date: temp, date2: temp2, ...}, vav: {date: temp, ...}}
    self.roomNumbers = {};       // {"10.65.06": [[601,  59], [636, 82]], ...}
    self.vavs = {};              // {"47102": ["10.S.J"], ...}


    self.getCoordinates = function getCoordinates(floorLevel) {
        return $http.post('/api/v1/coordinates', {'floorLevel': floorLevel}).then(function(response) {
            self.roomNumbers = response.data['room_num'];
            self.vavs = response.data['vav'];
        });
    };

    self.getRoomData = function getRoomData(floorLevel) {
        return $http.post('/api/v1/rooms', {'floorLevel': floorLevel}).then(function(response) {
            self.currentFloorData = response.data;
            LoadingService.makingRequest = false;
        });
    };

    self.getWeatherData = function getWeatherData() {
        return $http.get('/api/v1/weather-data').then(function(response) {
            self.weatherData = response.data;
            self.currentFloorDates = Object.keys(self.weatherData);
        });
    };

    self.getAllFloorData = function getAllFloorData(floorLevel) {
        LoadingService.makingRequest = true;
        
        var promises = [self.getCoordinates(floorLevel), self.getRoomData(floorLevel),
            self.getWeatherData()];

        return $q.all(promises);
    }
});