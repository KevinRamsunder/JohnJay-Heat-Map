app.controller('MovieController', movieController);

movieController.$inject = ['$scope', '$http', '$interval', 'leafletData', 'tableToMapService',
    'mapInteractionService', 'datePickerService', 'floorDataService', 'loadingService'];

function movieController($scope, $http, $interval, leafletData, tableToMapService, mapInteractionService,
                         datePickerService, floorDataService, loadingService) {
    $scope.currentDate = 'Current Date';
    $scope.isStopped = true;
    $scope.interval  = 50; // refresh rate for animation

    // index for run movie
    $scope.startDateIndex = 0;
    $scope.endDateIndex = 0;

    // variables for markers and data being shown
    $scope.marker_type = 'Circles';
    $scope.marker_options = 'Temp';

    $scope.startAnimation = function () {
        if (datePickerService.dateChanged || $scope.startDateIndex >= $scope.endDateIndex) {
            $scope.setDateIndex();
        }

        $scope.isStopped = false;

        leafletData.getMap('map').then(function (map) {
            $scope.animate(map);
        });
    };

    $scope.stopAnimation = function () {
        $scope.isStopped = true;
        $interval.cancel($scope.animation);
    };

    $scope.restartAnimation = function () {
        $scope.setDateIndex();
        $scope.startAnimation();
    };

    $scope.animate = function (map) {
        $scope.animation = $interval(function () {
            $scope.currentDate = floorDataService.currentFloorDates[$scope.startDateIndex];

            for (var vav in floorDataService.vavs) {

                if ($scope.currentDate in floorDataService.currentFloorData[vav]) {
                    var temp = floorDataService.currentFloorData[vav][$scope.currentDate];
                    var color = tableToMapService.getColorFromRanges(temp).color;

                    mapInteractionService.removeVavBoxFromMap($scope, map, vav);
                    mapInteractionService.addVavBoxToMap($scope, map, floorDataService.roomNumbers,
                        floorDataService.vavs, vav, color, temp);
                }

            }

            $scope.startDateIndex += 1;

            if ($scope.startDateIndex > $scope.endDateIndex) {
                $scope.stopAnimation();
            }
        }, $scope.interval);
    };

    $scope.loaderStatus = function () {
        return loadingService.loading || loadingService.makingRequest;
    };

    $scope.setDateIndex = function () {
        var startDate = datePickerService.startDate.toISOString().substring(0, 10) + ' 00:00:00';
        var endDate = datePickerService.endDate.toISOString().substring(0, 10) + ' 23:00:00';

        $scope.startDateIndex = floorDataService.currentFloorDates.indexOf(startDate);
        $scope.endDateIndex = floorDataService.currentFloorDates.indexOf(endDate);

        datePickerService.dateChanged = false;
    };

    $scope.updateMarkers = function () {
        mapInteractionService.marker_type = $scope.marker_type;
        mapInteractionService.marker_options = $scope.marker_options;
    };

    floorDataService.getData();
}