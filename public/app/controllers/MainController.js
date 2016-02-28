// create and link 'MainController' controller to angular application
app.controller('MainController', mainController);

// inject dependencies into 'MainController' controller
mainController.$inject = ['$scope', '$http', 'leafletData', 'leafletBoundsHelpers'];

// controller function
function mainController($scope, $http, leafletData, leafletBoundsHelpers) {
    // save context
    var self = this;

    // add map properties to scope
    initMap($scope);

    // add shapes to map
    addShapes(leafletData, $http, $scope);
}

// initialize and display map on webpage
var initMap = function(self) {
    // leaflet map settings
    angular.extend(self, {
        // default map properties
        defaults: {
            minZoom: 1,
            maxZoom: 3.6,
            crs: 'Simple'
        },

        // center map properties
        center: {
            lat: -190,
            lng: 150,
            zoom: 1
        },

        // set bounds
        // maxBounds: bounds,

        // layers
        layers: {
            baselayers: {
                tenthFloor: {
                    name: 'Tenth Floor',
                    type: 'imageOverlay',
                    url: 'app/assets/images/10thFloor.jpg',
                    // will fix this later
                    bounds: [[0, 347.8552729775042], [-374.5753081706553, 0]]
                }
            }
        }
    });
};

var addShapes = function(leafletData, $http, shapes) {
    leafletData.getMap('map').then(function(map) {
        $http.get('api/v1/rooms/47112').then(function(response) {
            console.log(response);
        });
        // make json call
        // add layer for every json
    });
};