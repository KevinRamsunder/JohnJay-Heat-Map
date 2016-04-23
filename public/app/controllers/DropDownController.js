app.controller('DropDownController', dropDownController);

dropDownController.$inject = ['$scope', 'mapInteractionService'];

function dropDownController($scope, mapInteractionService) {
    // variables for markers and data being shown
    $scope.marker_type = 'Squares';
    $scope.marker_options = 'Temp';

    $scope.updateMarkers = function () {
        mapInteractionService.marker_type = $scope.marker_type;
        mapInteractionService.marker_options = $scope.marker_options;
    };

    $scope.updateMarkers();
}