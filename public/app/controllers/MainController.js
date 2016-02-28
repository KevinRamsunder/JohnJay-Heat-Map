// create and link 'MainController' controller to angular application
app.controller('MainController', mainController);

// inject dependencies into 'MainController' controller
mainController.$inject = ['$scope', '$http', 'leafletBoundsHelpers'];

// controller function
function mainController($scope, $http, leafletBoundsHelpers) {
    // save context
    var self = this;

    // initialize and display map on webpage
    self.initMap = function() {
        var maxBounds = leafletBoundsHelpers.createBoundsFromArray([[0, 227], [210, 0]]);
        
        // leaflet map settings
        angular.extend($scope, {
            // default map properties
            defaults: {
                minZoom: 1,
                maxZoom: 3.6,
                crs: 'Simple'
            },

            // center map properties
            center: {
                lat: -390,
                lng: 150,
                zoom: 1
            },

            // set bounds
            maxBounds: maxBounds,

            // layers
            layers: {
                baselayers: {
                    tenthFloor: {
                        name: 'Tenth Floor',
                        type: 'imageOverlay',
                        url: 'app/assets/images/10thFloor.jpg',
                        bounds: [[0, 2271], [2109, 0]]
                    }
                }
            }
        });
    };

    self.initMap();
}