app.controller('MovieController', movieController);

movieController.$inject = ['$scope', '$interval', 'FloorDataService', 'MapInteractionService',
    'DateService', 'LoadingService'];

function movieController($scope, $interval, FloorDataService, MapInteractionService,
                         DateService, LoadingService) {

    $scope.currentDate = DateService.getEndDateString();
    $scope.isStopped = true;
    $scope.interval = 50; // refresh rate for animation

    // index for run movie
    $scope.startDateIndex = 0;
    $scope.endDateIndex = 0;

    $scope.startAnimation = function () {
        if (DateService.dateChanged || $scope.startDateIndex >= $scope.endDateIndex) {
            $scope.setDateIndex();
        }

        $scope.isStopped = false;
        $scope.animate();
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
            $scope.currentDate = FloorDataService.currentFloorDates[$scope.startDateIndex];

            // remove all markers on map
            MapInteractionService.removeMarkersFromMap();

            // add new markers to the map
            MapInteractionService.addMarkersToMap($scope.currentDate);

            // increment the startDateIndex
            $scope.startDateIndex += 1;

            if ($scope.startDateIndex > $scope.endDateIndex) {
                $scope.stopAnimation();
            }

        }, $scope.interval);
    };

    $scope.loaderStatus = function () {
        return LoadingService.loading || LoadingService.makingRequest;
    };

    $scope.setDateIndex = function () {
        $scope.startDateIndex = DateService.getStartDate();
        $scope.endDateIndex = DateService.getEndDate();
        DateService.dateChanged = false;
    };
}