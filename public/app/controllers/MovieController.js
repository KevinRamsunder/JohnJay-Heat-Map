app.controller('MovieController', movieController);

movieController.$inject = ['$scope', '$http', '$interval', 'leafletData',
    'mapInteractionService', 'datePickerService', 'floorDataService', 'loadingService'];

function movieController($scope, $http, $interval, leafletData, mapInteractionService,
                         datePickerService, floorDataService, loadingService) {

    $scope.currentDate = 'Current Date';
    $scope.isStopped = true;
    $scope.interval  = 50; // refresh rate for animation

    // index for run movie
    $scope.startDateIndex = 0;
    $scope.endDateIndex = 0;

    // get all the files for the floor
    floorDataService.getData();

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

            // get currentDate from startDateIndex
            $scope.currentDate = floorDataService.currentFloorDates[$scope.startDateIndex];

            // remove all markers on map
            mapInteractionService.removeMarkersFromMap($scope, map);

            // add new markers to the map
            mapInteractionService.addMarkersToMap($scope, map, $scope.currentDate);

            // increment the startDateIndex
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
        $scope.startDateIndex = datePickerService.getStartDate();
        $scope.endDateIndex = datePickerService.getEndDate();
        datePickerService.dateChanged = false;
    };
}