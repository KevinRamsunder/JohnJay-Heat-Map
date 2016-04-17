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

    // object with {vav: [date, temp, date, temp, ...]}
    $scope.mappedCSV = {};

    // object with {vav : {"date": "index_in_mappedCSV", "date2": "index", ...}}
    $scope.locationOfDate = {};

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

            for(var key in $scope.masterData) {
                $scope.mappedCSV[key] = $scope.masterData[key].split(',');
                $scope.mappedCSV[key] = $scope.mappedCSV[key].map(function(i) {return i.trim()});
                $scope.locationOfDate[key] = {};

                for (var i = 0; i < $scope.mappedCSV[key].length; i += 2) {
                    var index = i;
                    var date = $scope.mappedCSV[key][index];
                    $scope.locationOfDate[key][date] = index;
                }
            }

            mapInteraction.makingRequest = false;
            $scope.endDateIndex = $scope.mappedCSV['47102'].length;
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
            var i = $scope.startDateIndex;
            var j = $scope.startDateIndex + 1;
            $scope.startDateIndex += 2;

            // get keys from master data
            for(var key in $scope.masterData) {

                // get the date and temp from the mappedCSV
                var results = $scope.mappedCSV[key];
                var firstDate = results[i];
                var firstTemp = results[j];

                if(results[0] === '2013-06-06 00:00:00') {
                    $scope.showDate = results[i];
                    mapInteraction.removeVavBoxFromMap($scope, map, key);
                    mapInteraction.addVavBoxToMap($scope, map, $scope.roomNumbers.data,
                        $scope.vavs.data, key, tableToMapService.getColorFromRanges(firstTemp).color, firstTemp);
                } else {
                    // delete error boxes from the map
                    mapInteraction.removeVavBoxFromMap($scope, map, key);
                    $scope.masterData[key] = undefined;
                }
            }

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

        $scope.startDateIndex = $scope.locationOfDate['47102'][startDate];
        $scope.endDateIndex = $scope.locationOfDate['47102'][endDate];

        datePickerService.dateChanged = false;
    };

    $scope.updateMarkers = function() {
        mapInteraction.marker_type = $scope.marker_type;
        mapInteraction.marker_options = $scope.marker_options;
    };

    $scope.getData();
}