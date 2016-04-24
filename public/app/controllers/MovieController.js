app.controller('MovieController', movieController);

movieController.$inject = ['$scope', '$interval', 'FloorDataService', 'MapInteractionService',
    'LoadingService', '$rootScope'];

function movieController($scope, $interval, FloorDataService, MapInteractionService,
                         LoadingService, $rootScope) {

    $rootScope.currentDate = $rootScope.endDate.toISOString().substring(0, 10) + ' 23:00:00';

    $scope.isStopped = true;
    $scope.interval = 50; // refresh rate for animation

    // index for run movie
    $scope.startDateIndex = 0;
    $scope.endDateIndex = 0;

    $scope.startAnimation = function () {
        if ($rootScope.dateChanged || $scope.startDateIndex >= $scope.endDateIndex) {
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

    $scope.animate = function () {
        $scope.animation = $interval(function () {

            // get currentDate from startDateIndex
            $rootScope.currentDate = FloorDataService.currentFloorDates[$scope.startDateIndex];

            // remove all markers on map
            MapInteractionService.removeMarkersFromMap();

            // add new markers to the map
            MapInteractionService.addMarkersToMap($rootScope.currentDate);

            // increment the startDateIndex
            $scope.startDateIndex += 1;

            if ($scope.startDateIndex > $scope.endDateIndex) {
                $scope.stopAnimation();
            }

        }, $scope.interval);
    };

    $scope.loaderStatus = function () {
        return LoadingService.loaderStatus();
    };

    $scope.setDateIndex = function () {
        var startDateString = $rootScope.startDate.toISOString().substring(0, 10) + ' 00:00:00';
        var endDateString = $rootScope.endDate.toISOString().substring(0, 10) + ' 23:00:00';

        $scope.startDateIndex = FloorDataService.currentFloorDates.indexOf(startDateString);
        $scope.endDateIndex = FloorDataService.currentFloorDates.indexOf(endDateString);
        $rootScope.dateChanged = false;
    };
}