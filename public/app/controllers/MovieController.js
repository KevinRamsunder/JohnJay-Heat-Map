app.controller('MovieController', movieController);

movieController.$inject = ['$scope', '$http', '$interval', 'leafletData', 'tableToMapService', 'mapInteraction', 'datePickerService'];

function movieController($scope, $http, $interval, leafletData, tableToMapService, mapInteraction, datePickerService) {
    $scope.currentDate = 'Current Date';
    $scope.isStopped = true;
    $scope.animation = undefined;
    $scope.firstRun = true;
    $scope.interval = 50; // refresh rate for animation

    $scope.startDateIndex = 0;
    $scope.endDateIndex = 0;

    $scope.locationOfDate = {};

    $scope.populateCSV = function() {
        mapInteraction.makingRequest = true;

        $http.get('/api/v1/rooms').then(function(response) {
            $scope.masterData = response.data;
            $scope.mappedCSV = {};

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
        $scope.firstRun = false;

        leafletData.getMap('map').then(function(map) {
            var data = getJSON($scope, $http, mapInteraction).then(function(response) {
               $scope.animate(map, response);               
            });
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

    $scope.animate = function(map, response) {
        $scope.animation = $interval(function() {
            var i = $scope.startDateIndex;
            var j = $scope.startDateIndex + 1;
            $scope.startDateIndex += 2;

            for(var key in $scope.masterData) {
                var results = $scope.mappedCSV[key];

                var firstDate = results[i];
                var firstTemp = results[j];

                if(results[0] === '2013-06-06 00:00:00') {
                    $scope.currentDate = results[i];
                    mapInteraction.removeVavBoxFromMap($scope, map, key);
                    mapInteraction.addVavBoxToMap($scope, map, response.roomNumbers.data, response.vavBoxes.data, key, tableToMapService.getColorFromRanges(firstTemp).color, firstTemp);
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

    $scope.populateCSV();
}