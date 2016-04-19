app.service('floorDataService', function (loadingService, $http, $q) {
    var self = this;

    self.currentFloorData = {};  // {vav: {date: temp, date2: temp2, ...}, vav: {date: temp, ...}}
    self.currentFloorDates = []; // [2013-06-06 00:00:00", "2013-06-06 01:00:00", ...]
    self.roomNumbers = {};
    self.vavs = {};
    self.weatherData = {};

    self.getData = function () {
        loadingService.makingRequest = true;

        var roomNumbers = $http.get("app/assets/json/floor_10/room_num.json"),
            vavs = $http.get("app/assets/json/floor_10/vav.json"),
            weather = $http.get("/api/v1/weather-data"),
            currentFloorData = $http.get("/api/v1/rooms");

        var promise = $q.all([roomNumbers, vavs, weather, currentFloorData]).then(function (arrayOfResults) {

            self.roomNumbers = arrayOfResults[0].data;
            self.vavs = arrayOfResults[1].data;

            var tempStorage = arrayOfResults[2].data.split(',');
            for (var i = 16; i < tempStorage.length; i += 8) {
                self.weatherData[tempStorage[i].replace("EWR", "").replace(/(\r\n|\n|\r)/gm, "")] = tempStorage[i + 1];
            }
            delete self.weatherData[''];

            // {vav: "date, temp, date, temp", vav : "date, temp", ...}
            var masterData = arrayOfResults[3].data;

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

        return {
            promise: promise
        }

    };
});