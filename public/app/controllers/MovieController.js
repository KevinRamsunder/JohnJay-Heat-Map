app.controller('MovieController', movieController);

movieController.$inject = ['$scope', '$interval', 'FloorDataService', 'MapInteractionService',
    'LoadingService', '$rootScope'];

function movieController($scope, $interval, FloorDataService, MapInteractionService,
                         LoadingService, $rootScope) {

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

    $rootScope.stopAnimation = function () {
        $scope.isStopped = true;
        $interval.cancel($scope.animation);
    };

    $scope.restartAnimation = function () {
        $scope.setDateIndex();
        $scope.startAnimation();
    };

    $scope.animate = function () {
        $scope.animation = $interval(function () {
            // remove all markers on map
            MapInteractionService.removeMarkersFromMap();

            // add new markers to the map
            MapInteractionService.addMarkersToMap(
                FloorDataService.availableDates[$scope.startDateIndex]);

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
        // Set the startDateIndex to the beginning of the day
        $scope.startDateIndex = FloorDataService.availableDates.indexOf(
            $rootScope.startDate.toISOString().substring(0, 10) + ' 00:00:00');

        // Set the endDateIndex to the end of the day
        $scope.endDateIndex = FloorDataService.availableDates.indexOf(
            $rootScope.endDate.toISOString().substring(0, 10) + ' 23:00:00');

        // console.log("inside setDate");
        // console.log(FloorDataService.availableDates[$scope.endDateIndex]);
        // console.log($rootScope.endDate);

        $rootScope.dateChanged = false;
    };

    // delay rapid execution of functions for given interval
    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    // if animation is stopped, this will update the colors on the map
    var updateColorsOnMap = debounce(function(event) {
        if($scope.isStopped) {
            MapInteractionService.removeMarkersFromMap();
            MapInteractionService.addMarkersToMap($rootScope.displayDate);
        }
    }, 100);

    // attach event listeners to color-picker elements
    $('.color-picker').colorpicker().on('changeColor.colorpicker', updateColorsOnMap);
    $('.range-number').change(updateColorsOnMap);
}