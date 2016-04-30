app.service('FloorDataService', function (LoadingService, $http, $q) {
    var self = this;

    self.availableDates = []; // [2013-06-06 00:00:00", "2013-06-06 01:00:00", ...]
    self.weatherData = {};    // {"2013-01-01 01:00:00": "37.04", ...}

    self.roomData = {};        // {vav: {date: temp, ...}, vav: {date: temp, ...}}
    self.roomCoordinates = {}; // {"10.65.06": [[601,  59], [636, 82]], ...}
    self.vavs = {};            // {"47102": ["10.S.J"], ...}


    self.getCoordinates = function getCoordinates(floorLevel) {
        return $http.post('/api/v1/coordinates', {'floorLevel': floorLevel}).then(function(response) {
            self.roomCoordinates = response.data['roomCoordinates'];
            self.vavs = response.data['vavs'];
        });
    };

    self.getRoomData = function getRoomData(floorLevel) {
        return $http.post('/api/v1/rooms-data', {'floorLevel': floorLevel}).then(function(response) {
            self.roomData = response.data;
            LoadingService.makingRequest = false;
        });
    };

    self.getWeatherData = function getWeatherData() {
        return $http.get('/api/v1/weather-data').then(function(response) {
            self.weatherData = response.data;
            self.availableDates = Object.keys(self.weatherData);
        });
    };

    self.getAllFloorData = function getAllFloorData(floorLevel) {
        LoadingService.makingRequest = true;
        
        var promises = [self.getCoordinates(floorLevel), self.getRoomData(floorLevel),
            self.getWeatherData()];

        return $q.all(promises);
    }
});