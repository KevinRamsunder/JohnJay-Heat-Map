app.controller('DropDownController', dropDownController);

dropDownController.$inject = ['$scope', 'MapInteractionService'];

function dropDownController($scope, MapInteractionService) {
    // variables for markers and data being shown
    $scope.marker_type = 'Squares';
    $scope.marker_options = 'Temp';

    $scope.updateMarkers = function () {
        MapInteractionService.marker_type = $scope.marker_type;
        MapInteractionService.marker_options = $scope.marker_options;
    };

    $scope.updateMarkers();
}