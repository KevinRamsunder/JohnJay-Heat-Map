app.service('floorDataService', function (mapInteraction, $http) {
    var self = this;


    self.currentFloorData = {};  // {vav: {date: temp, date2: temp2, ...}, vav: {date: temp, ...}}
    self.currentFloorDates = []; // [2013-06-06 00:00:00", "2013-06-06 01:00:00", ...]
    self.roomNumbers = {};
    self.vavs = {};

    self.getData = function () {
        mapInteraction.makingRequest = true;

        $http.get('app/assets/json/floor_10/room_num.json').then(function (response) {
            self.roomNumbers = response.data;
        });

        $http.get('app/assets/json/floor_10/vav.json').then(function (response) {
            self.vavs = response.data;
        });

        $http.get('/api/v1/rooms').then(function (response) {
            // object with {47102: "2013-06-06 00:00:00, 73.13, 2013-06006 01:00:00, 73.0, ...}
            // vav: string of all data
            var masterData = response.data;

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

            mapInteraction.makingRequest = false;
        });
    };
});