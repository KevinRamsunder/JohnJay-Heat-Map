app.service('floorDataService', function (loadingService, $http) {
    var self = this;

    self.currentFloorData = {};  // {vav: {date: temp, date2: temp2, ...}, vav: {date: temp, ...}}
    self.currentFloorDates = []; // [2013-06-06 00:00:00", "2013-06-06 01:00:00", ...]
    self.vavs = {};
    self.roomNumbers = {};
    self.weatherData = {};

    self.getData = function () {
        loadingService.makingRequest = true;

        $http.get('app/assets/json/floor_10/room_num.json').then(function (response) {
            self.roomNumbers = response.data;
        });

        $http.get('app/assets/json/floor_10/vav.json').then(function (response) {
            self.vavs = response.data;
        });

        $http.get('/api/v1/weather-data').then(function (response) {
            self.weatherData = response.data;
        });

        $http.get('/api/v1/rooms').then(function (response) {
            self.currentFloorDates = response.data['Dates'];
            self.currentFloorData = response.data['Data'];

            loadingService.makingRequest = false;
        });
    };
});