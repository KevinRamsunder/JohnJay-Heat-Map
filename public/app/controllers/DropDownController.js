app.controller('DropDownController', dropDownController);

dropDownController.$inject = ['$scope', 'MapInteractionService', 'LoadingService', '$rootScope'];

function dropDownController($scope, MapInteractionService, LoadingService, $rootScope) {
    $scope.tabs = [
        { title:'Squares', content:'tab1.html' },
        { title:'Circles', content:'tab2.html'}
    ];

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