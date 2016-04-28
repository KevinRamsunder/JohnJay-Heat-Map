app.controller('DropDownController', dropDownController);

dropDownController.$inject = ['$scope', 'MapInteractionService', 'LoadingService', '$rootScope'];

function dropDownController($scope, MapInteractionService, LoadingService, $rootScope) {
    // variables for markers and data being shown
    $rootScope.marker_type = 'Squares';
    $rootScope.marker_options = 'Temp';

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

    var updateColorsOnMap = debounce(function(event) {
        MapInteractionService.removeMarkersFromMap();
        MapInteractionService.addMarkersToMap($rootScope.displayDate);
    }, 250);

    // attach event listeners to color-picker elements
    $('.color-picker').colorpicker().on('changeColor.colorpicker', updateColorsOnMap);

    $scope.updateMarkers = function () {
        MapInteractionService.removeMarkersFromMap();
        MapInteractionService.addMarkersToMap($rootScope.displayDate);
    };

    $scope.loaderStatus = function() {
        return LoadingService.loaderStatus();
    };
}