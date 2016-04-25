app.controller('DropDownController', dropDownController);

dropDownController.$inject = ['$scope', 'MapInteractionService', 'LoadingService', '$rootScope'];

function dropDownController($scope, MapInteractionService, LoadingService, $rootScope) {
    // variables for markers and data being shown
    $rootScope.marker_type = 'Squares';
    $rootScope.marker_options = 'Temp';

    $scope.updateMarkers = function () {
        MapInteractionService.removeMarkersFromMap();
        MapInteractionService.addMarkersToMap($rootScope.displayDate);
    };

    $scope.loaderStatus = function() {
        return LoadingService.loaderStatus();
    };
}