app.controller('DropDownController', dropDownController);

dropDownController.$inject = ['$scope', 'MapInteractionService', 'LoadingService', '$rootScope'];

function dropDownController($scope, MapInteractionService, LoadingService, $rootScope) {
    // variables for markers and data being shown
    $scope.marker_type = 'Squares';
    $scope.marker_options = 'Temp';

    $scope.updateMarkers = function () {
        MapInteractionService.marker_type = $scope.marker_type;
        MapInteractionService.marker_options = $scope.marker_options;

        MapInteractionService.removeMarkersFromMap();

        var endDateString = $rootScope.endDate.toISOString().substring(0, 10) + ' 23:00:00';
        MapInteractionService.addMarkersToMap(endDateString);
    };

    $scope.setInitialMarkers = function () {
        MapInteractionService.marker_type = $scope.marker_type;
        MapInteractionService.marker_options = $scope.marker_options;
    };

    $scope.loaderStatus = function() {
        return LoadingService.loaderStatus();
    };

    $scope.setInitialMarkers();
}