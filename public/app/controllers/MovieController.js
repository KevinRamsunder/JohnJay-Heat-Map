app.controller('MovieController', movieController);

movieController.$inject = ['$scope', '$http', '$interval', 'leafletData', 'tableToMapService', 'mapInteraction'];

function movieController($scope, $http, $interval, leafletData, tableToMapService, mapInteraction) {
    $scope.currentDate = 'Current Date';
    $scope.isStopped = true;
    $scope.animation = undefined;
    $scope.firstRun = true;
    $scope.interval = 50; // refresh rate for animation

    $scope.populateCSV = function() {
        $http.get('/api/v1/rooms').then(function(response) {
            $scope.masterData = response.data;
            $scope.mappedCSV = {};

            for(var key in $scope.masterData) {
                $scope.mappedCSV[key] = $scope.masterData[key].split(',');
            }
        });
    };

    $scope.restartAnimation = function() {
        $scope.restartDate = $scope.currentDate;
        $scope.stopAnimation();

        $scope.isStopped = false;
        $scope.firstRun = false;

        leafletData.getMap('map').then(function(map) {
            var data = getJSON($scope, $http).then(function(response) {
               $scope.restartAnimate(map, response);               
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

    $scope.startAnimation = function() {
        $scope.isStopped = false;
        $scope.firstRun = false;

        leafletData.getMap('map').then(function(map) {
            var data = getJSON($scope, $http).then(function(response) {
               $scope.animate(map, response);               
            });
        });
    }

    $scope.animate = function(map, response) {
        $scope.current = 0;
        var length = $scope.mappedCSV['47102'].length;

        $scope.animation = $interval(function() {
            var i = $scope.current;
            var j = $scope.current + 1;
            $scope.current += 2;

            for(var key in $scope.masterData) {
                var results = $scope.mappedCSV[key];

                var firstDate = results[i];
                var firstTemp = results[j];

                if(results[0] === '2013-06-06 00:00:00') {
                    $scope.currentDate = results[i];
                    mapInteraction.removeVavBoxFromMap($scope, map, key);
                    mapInteraction.addVavBoxToMap($scope, map, response.roomNumbers.data, response.vavBoxes.data, key, tableToMapService.getColorFromRanges(firstTemp).color); 
                }
            }

            if($scope.current >= length) {
                $scope.stopAnimation();
            }
        }, $scope.interval);
    };

    $scope.restartAnimate = function(map, response) {
        var length = $scope.mappedCSV['47102'].length;

        $scope.animation = $interval(function() {
            var i = $scope.current;
            var j = $scope.current + 1;
            $scope.current += 2;

            for(var key in $scope.masterData) {
                var results = $scope.mappedCSV[key];

                var firstDate = results[i];
                var firstTemp = results[j];

                if(results[0] === '2013-06-06 00:00:00') {
                    $scope.currentDate = results[i];
                    mapInteraction.removeVavBoxFromMap($scope, map, key);
                    mapInteraction.addVavBoxToMap($scope, map, response.roomNumbers.data, response.vavBoxes.data, key, tableToMapService.getColorFromRanges(firstTemp).color); 
                }
            }

            if($scope.current >= length) {
                $scope.stopAnimation();
            }
        }, $scope.interval);
    };

    $scope.populateCSV();
}