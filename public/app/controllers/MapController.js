// create and link 'MainController' controller to angular application
app.controller('MapController', mapController);

// inject dependencies into 'MainController' controller
mapController.$inject = ['$scope', '$http', 'leafletData', 'MapInteractionService', 'FloorDataService', 'DateService'];

// controller function
function mapController($scope, $http, leafletData, MapInteractionService, FloorDataService, DateService) {
    // save context
    var self = this;
    $scope.currentDate = "";

    // add map properties to scope
    initMap($scope);


    /*********************************************************/

    /* Here lies function postProcess(), may we never forget */

    /*********************************************************/

    // initialize current layer
    FloorDataService.getAllFloorData('floor_10').then(function() {
        MapInteractionService.addMarkersToMap(DateService.getEndDateString());
    });

    // circles on map will zoom appropriately when movie is not playing
    leafletData.getMap('map').then(function (map) {
        map.on('baselayerchange', function(layer) {
            MapInteractionService.removeMarkersFromMap(map);
            
            FloorDataService.getAllFloorData(layer.name).then(function() {
                MapInteractionService.addMarkersToMap(map, DateService.getEndDateString());
            });
        });

        var info = L.control();

        info.onAdd = function(map) {
            this._div = L.DomUtil.create('div', 'info');
            return this._div;
        };

        info.update = function (latlong) {
            this._div.innerHTML = latlong;
        };

        map.on('mousemove',function(e){
            info.update(e.latlng);
        });

        info.addTo(map);

        map.on('zoomend', function () {
            var markers = [];
            this.eachLayer(function (marker) {
                markers.push(marker);
            });

            var i;
            if (map.getZoom() == 2) {
                for (i = 1; i < markers.length; i++) {
                    // markers[i].setRadius(markers[i].getRadius() * 1.2);
                }
            } else if (map.getZoom() == 3) {
                for (i = 1; i < markers.length; i++) {
                    // markers[i].setRadius(markers[i].getRadius() * 4);
                }
            }
        });
    });
}

// initialize and display map on webpage
var initMap = function(self) {
    // leaflet map settings
    angular.extend(self, {
        // default map properties
        defaults: {
            minZoom: 1,
            maxZoom: 3,
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
                    name: 'floor_10',
                    type: 'imageOverlay',
                    url: 'app/assets/images/nb_floor_10.jpg',
                    // will fix this later
                    bounds: [
                        [0, 347.8552729775042],
                        [-374.5753081706553, 0]
                    ]
                },
                ninthFloor: {
                    name: 'floor_9',
                    type: 'imageOverlay',
                    url: 'app/assets/images/floor_9.jpg',
                    // will fix this later
                    bounds: [
                        [0, 347.8552729775042],
                        [-374.5753081706553, 0]
                    ]
                },
                eightFloor: {
                    name: 'floor_8',
                    type: 'imageOverlay',
                    url: 'app/assets/images/floor_8.jpg',
                    // will fix this later
                    bounds: [
                        [0, 347.8552729775042],
                        [-374.5753081706553, 0]
                    ]
                },
                seventhFloor: {
                    name: 'floor_7',
                    type: 'imageOverlay',
                    url: 'app/assets/images/floor_7.jpg',
                    // will fix this later
                    bounds: [
                        [0, 347.8552729775042],
                        [-374.5753081706553, 0]
                    ]
                },
                sixthFloor: {
                    name: 'floor_6',
                    type: 'imageOverlay',
                    url: 'app/assets/images/floor_6.jpg',
                    // will fix this later
                    bounds: [
                        [0, 347.8552729775042],
                        [-374.5753081706553, 0]
                    ]
                }
            }
        }
    });
};