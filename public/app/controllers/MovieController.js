app.controller('MovieController', movieController);

movieController.$inject = ['$scope', '$http', '$interval', 'leafletData', 'tableToMapService', 'mapInteraction', 'datePickerService'];

function movieController($scope, $http, $interval, leafletData, tableToMapService, mapInteraction, datePickerService) {
    $scope.showDate  = 'Current Date';
    $scope.isStopped = true;
    $scope.animation = undefined;
    $scope.interval  = 50; // refresh rate for animation

    // index for run movie
    $scope.startDateIndex = 0;
    $scope.endDateIndex   = 0;

    // variables for markers and data being shown
    $scope.marker_type = 'Circles';
    $scope.marker_options = 'Temp';

    // object with {47102: "2013-06-06 00:00:00, 73.13, 2013-06006 01:00:00, 73.0, ...}
    // vav: string of all data
    $scope.masterData = {};

    // object with {vav: {date: temp, date2: temp2, ...}}
    $scope.currentFloorData = {};

    // list of dates [2013-06-06 00:00:00", "2013-06-06 01:00:00", ...]
    $scope.currentFloorDates = [];

    $scope.getData = function() {
        mapInteraction.makingRequest = true;

        $http.get('app/assets/json/floor_10/room_num.json').then(function(response) {
            $scope.roomNumbers = response;
        });

        $http.get('app/assets/json/floor_10/vav.json').then(function(response) {
            $scope.vavs = response;
        });

        $http.get('/api/v1/rooms').then(function(response) {
            $scope.masterData = response.data;

            var tempData = {};
            var do_once = true;

            for(var key in $scope.masterData) {
                tempData[key] = $scope.masterData[key].split(',');
                tempData[key] = tempData[key].map(function(i) {return i.trim()});

                var floorData = {};
                for(var i = 0; i < tempData[key].length-1; i += 2) {
                    floorData[tempData[key][i]] = tempData[key][i+1];

                    if (do_once) {
                        $scope.currentFloorDates.push(tempData[key][i])
                    }
                }

                do_once = false;
                $scope.currentFloorData[key] = floorData;
            }

            $scope.endDateIndex = $scope.currentFloorDates.length;
            mapInteraction.makingRequest = false;
        });
    };

    $scope.startAnimation = function() {
        if (datePickerService.dateChanged || $scope.startDateIndex >= $scope.endDateIndex) {
            $scope.setDateIndex();
        }

        $scope.isStopped = false;

        leafletData.getMap('map').then(function(map) {
            $scope.animate(map);
        });
    };

    $scope.stopAnimation = function() {
        if(angular.isDefined($scope.animation)) {
            $scope.isStopped = true;
            $interval.cancel($scope.animation);
            $scope.animation = undefined;
        }
    };

    $scope.restartAnimation = function() {
        $scope.setDateIndex();
        $scope.startAnimation();
    };

    $scope.animate = function(map) {
        $scope.animation = $interval(function() {
            var current_date = $scope.currentFloorDates[$scope.startDateIndex];



            for(var vav in $scope.masterData) {

                if (current_date in $scope.currentFloorData[vav]) {
                    var temp  = $scope.currentFloorData[vav][current_date];
                    var color = tableToMapService.getColorFromRanges(temp).color;

                    $scope.showDate = current_date;
                    mapInteraction.removeVavBoxFromMap($scope, map, vav);
                    mapInteraction.addVavBoxToMap($scope, map, $scope.roomNumbers.data,
                        $scope.vavs.data, vav, color, temp);
                }

            }

            $scope.startDateIndex += 1;

            if($scope.startDateIndex > $scope.endDateIndex) {
                $scope.stopAnimation();
            }
        }, $scope.interval);
    };

    $scope.loaderStatus = function() {
        return mapInteraction.loading || mapInteraction.makingRequest;
    };

    $scope.setDateIndex = function() {
        var startDate = datePickerService.startDate.toISOString().substring(0,10) + ' 00:00:00';
        var endDate = datePickerService.endDate.toISOString().substring(0,10) + ' 23:00:00';

        $scope.startDateIndex = $scope.currentFloorDates.indexOf(startDate);
        $scope.endDateIndex = $scope.currentFloorDates.indexOf(endDate);

        datePickerService.dateChanged = false;
    };

    $scope.updateMarkers = function() {
        mapInteraction.marker_type = $scope.marker_type;
        mapInteraction.marker_options = $scope.marker_options;
    };

    $scope.getData();
}