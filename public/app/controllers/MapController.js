// create and link 'MainController' controller to angular application
app.controller('MapController', mapController);

// inject dependencies into 'MainController' controller
mapController.$inject = ['$scope', 'leafletData', 'FloorDataService', 'MapInteractionService', '$rootScope'];

// controller function
function mapController($scope, leafletData, FloorDataService, MapInteractionService, $rootScope) {

    // save context
    var self = this;

    // set the default date to the most recent date available
    self.defaultDate = $rootScope.endDate.toISOString().substring(0, 10) + ' 23:00:00';

    // add map properties to scope
    initMap($scope);

    // initialize current layer
    FloorDataService.getAllFloorData('floor_10').then(function () {
        MapInteractionService.addMarkersToMap(self.defaultDate);
    });

    leafletData.getMap('map').then(function (map) {
        map.on('baselayerchange', function (layer) {
            MapInteractionService.removeMarkersFromMap();

            FloorDataService.getAllFloorData(layer.name).then(function () {
                MapInteractionService.addMarkersToMap(self.defaultDate);
            });
        });

        var info = L.control();

        info.onAdd = function () {
            this._div = L.DomUtil.create('div', 'info');
            return this._div;
        };

        info.update = function (latlong) {
            this._div.innerHTML = latlong;
        };

        map.on('mousemove', function (e) {
            info.update(e.latlng);
        });

        info.addTo(map);

        // circles on map will zoom appropriately when movie is not playing
        map.on('zoomend', function () {
            if (MapInteractionService.marker_type === 'Circles') {
                MapInteractionService.removeMarkersFromMap();
                MapInteractionService.addMarkersToMap($rootScope.displayDate);
            }
        });
    });
}

// initialize and display map on webpage
var initMap = function (self) {
    angular.extend(self, {
        defaults: {
            minZoom: 0,  // zoom changes by 1
            maxZoom: 2,
            crs: L.CRS.Simple
        },

        center: {
            lat: 280,
            lng: 300,
            zoom: 0  // must be greater than or equal to minZoom
        },

        layers: {
            baselayers: {
                tenthFloor: {
                    name: 'floor_10',
                    type: 'imageOverlay',
                    url: 'app/assets/images/floor_10.jpg',

                    // keep ratio of image intact when setting bounds
                    // image is 2400 x 2700
                    // if bounds are too large, circles and square won't map very well
                    bounds: [[0, 600], [675, 0]]
                },
                ninthFloor: {
                    name: 'floor_9',
                    type: 'imageOverlay',
                    url: 'app/assets/images/floor_9.jpg',
                    bounds: [[0, 600], [675, 0]]
                },
                eightFloor: {
                    name: 'floor_8',
                    type: 'imageOverlay',
                    url: 'app/assets/images/floor_8.jpg',
                    bounds: [[0, 600], [675, 0]
                    ]
                },
                seventhFloor: {
                    name: 'floor_7',
                    type: 'imageOverlay',
                    url: 'app/assets/images/floor_7.jpg',
                    bounds: [[0, 600], [675, 0]]
                },
                sixthFloor: {
                    name: 'floor_6',
                    type: 'imageOverlay',
                    url: 'app/assets/images/floor_6.jpg',
                    bounds: [[0, 600], [675, 0]]
                }
            }
        }
    });
};