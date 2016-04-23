app.service('floorDataService', function (loadingService, $http, $q, HttpPromise) {
    var self = this;

    self.currentFloorData = {};  // {vav: {date: temp, date2: temp2, ...}, vav: {date: temp, ...}}
    self.currentFloorDates = []; // [2013-06-06 00:00:00", "2013-06-06 01:00:00", ...]
    self.roomNumbers = {};
    self.vavs = {};
    self.weatherData = {};

    loadingService.makingRequest = true;

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
        return HttpPromise.getWeatherData().then(function(tempStorage) {
            for (var i = 16; i < tempStorage.length; i += 8) {
                self.weatherData[tempStorage[i].replace("EWR", "").replace(/(\r\n|\n|\r)/gm,"")] = tempStorage[i+1];
            }

            delete self.weatherData[''];
        });
    };

    self.getRoomData = function getRoomData() {
        return HttpPromise.getRoomData().then(function(masterData) {
            var tempData = {};
            var do_once = true;

            for (var key in masterData) {
                tempData[key] = masterData[key].split(',');
                tempData[key] = tempData[key].map(function (i) {
                    return i.trim()
                });

                var floorData = {};
                for (var i = 0; i < tempData[key].length - 1; i += 2) {
                    floorData[tempData[key][i]] = tempData[key][i + 1];

                    if (do_once) {
                        self.currentFloorDates.push(tempData[key][i])
                    }
                }

                do_once = false;
                self.currentFloorData[key] = floorData;
            }

            loadingService.makingRequest = false;
        });
    }

    self.getAllFloorData = function getAllFloorData() {
        var promises = [self.getRoomNumbers(), self.getVavNumbers(),
                        self.getWeatherData(), self.getRoomData()];

        return $q.all(promises);
    }
});