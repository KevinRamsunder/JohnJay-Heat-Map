app.controller('MovieController', movieController);

movieController.$inject = ['$scope', '$http', '$interval', 'leafletData', 'tableToMapService'];

function movieController($scope, $http, $interval, leafletData, tableToMapService) {
    $scope.currentDate = 'Current Date';
    $scope.isStopped = true;
    $scope.animation = undefined;
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

    $scope.stopAnimation = function() {
        if(angular.isDefined($scope.animation)) {
            $scope.isStopped = true;
            $interval.cancel($scope.animation);
            $scope.animation = undefined;
        }
    };

    $scope.startAnimation = function() {
        $scope.isStopped = false;

        leafletData.getMap('map').then(function(map) {
            var data = getJSON($scope, $http).then(function(response) {
               $scope.animate(map, response);               
            });
        });
    }

    $scope.animate = function(map, response) {
        var current = 0;
        var length = $scope.mappedCSV['47102'].length;

        $scope.animation = $interval(function() {
            var i = current;
            var j = current + 1;
            current += 2;

            for(var key in $scope.masterData) {
                var results = $scope.mappedCSV[key];

                var firstDate = results[i];
                var firstTemp = results[j];

                if(results[0] === '2013-06-06 00:00:00') {
                    $scope.currentDate = results[i];
                    removeVavBoxFromMap($scope, map, key);
                    addVavBoxToMap($scope, map, response.roomNumbers.data, response.vavBoxes.data, key, tableToMapService.getColorFromRanges(firstTemp).color); 
                }
            }

            if(current >= length) {
                $scope.stopAnimation();
            }
        }, $scope.interval);
    };

    $scope.populateCSV();
}   