app.controller('MainCtrl', mainCtrl);

// inject dependencies into 'MainController' controller
mainCtrl.$inject = ['$scope', 'floorDataService', 'mapInteractionService', 'leafletData'];

// controller function
function mainCtrl($scope, floorDataService, mapInteractionService, leafletData) {
    console.log('Promise is now resolved: ' + floorDataService);
    leafletData.getMap('map').then(function (map) {
        // if (floorDataService.vav)

            window.setTimeout(function (){
                mapInteractionService.addMarkersToMap($scope, map, '2013-06-06 03:00:00');
                console.log('hi')
            }, 10000);

        // else {
        //     console.log('empty');
        // }
    });

}