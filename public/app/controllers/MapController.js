// create and link 'MainController' controller to angular application
app.controller('MapController', mapController);

// inject dependencies into 'MainController' controller
mapController.$inject = ['$scope', 'leafletData', 'FloorDataService', 'MapInteractionService', 'DateService'];

// controller function
function mapController($scope, leafletData, FloorDataService, MapInteractionService, DateService) {
    // save context
    var self = this;
    $scope.currentDate = "";

    // add map properties to scope
    initMap($scope);

    /*********************************************************/

    /* Here lies function postProcess(), may we never forget */

    /*********************************************************/

    // initialize current layer
    FloorDataService.getAllFloorData('floor_10').then(function () {
        MapInteractionService.addMarkersToMap(DateService.getEndDateString());
    });

    leafletData.getMap('map').then(function (map) {
        // LINE IS COMMENTED OUT UNTIL NEW DATA IS IN NODE FOLDER
        // map.on('baselayerchange', function (layer) {
        //     MapInteractionService.removeMarkersFromMap();
        //
        //     FloorDataService.getAllFloorData(layer.name).then(function () {
        //         MapInteractionService.addMarkersToMap(DateService.getEndDateString());
        //     });
        // });

        var info = L.control();

        info.onAdd = function (map) {
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
var initMap = function (self) {
    angular.extend(self, {
        defaults: {
            minZoom: -.8,
            maxZoom: .2,
            crs: 'Simple'
        },

        center: {
            lat: 575,
            lng: 600,
            zoom: -.8
        },

        layers: {
            baselayers: {
                tenthFloor: {
                    name: 'floor_10',
                    type: 'imageOverlay',
                    url: 'app/assets/images/floor_10.jpg',
                    // will fix this later
                    bounds: [
                        [0, 1200],
                        [1350, 0]
                    ]
                },
                ninthFloor: {
                    name: 'floor_9',
                    type: 'imageOverlay',
                    url: 'app/assets/images/floor_9.jpg',
                    // will fix this later
                    bounds: [
                        [0, 1200],
                        [1350, 0]
                    ]
                },
                eightFloor: {
                    name: 'floor_8',
                    type: 'imageOverlay',
                    url: 'app/assets/images/floor_8.jpg',
                    // will fix this later
                    bounds: [
                        [0, 1200],
                        [1350, 0]
                    ]
                },
                seventhFloor: {
                    name: 'floor_7',
                    type: 'imageOverlay',
                    url: 'app/assets/images/floor_7.jpg',
                    // will fix this later
                    bounds: [
                        [0, 1200],
                        [1350, 0]
                    ]
                },
                sixthFloor: {
                    name: 'floor_6',
                    type: 'imageOverlay',
                    url: 'app/assets/images/floor_6.jpg',
                    // will fix this later
                    bounds: [
                        [0, 1200],
                        [1350, 0]
                    ]
                }
            }
        }
    });
};