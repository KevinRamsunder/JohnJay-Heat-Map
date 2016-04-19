// create and link 'MainController' controller to angular application
app.controller('MapController', mapController);

// inject dependencies into 'MainController' controller
mapController.$inject = ['$scope', '$http', 'leafletData', 'mapInteractionService'];

// controller function
function mapController($scope, $http, leafletData, mapInteractionService) {
    // save context
    var self = this;

    $scope.currentDate = "";

    // add map properties to scope
    initMap($scope);

    // post-processing
    postProcess($scope, $http, leafletData, mapInteractionService);

    // circles on map will zoom appropriately when movie is not playing
    leafletData.getMap('map').then(function (map) {
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
    // leaflet map settings
    angular.extend(self, {

        // default map properties
        defaults: {
            minZoom: -.7,  // zoom changes by 1
            maxZoom: .3,
            crs: L.CRS.Simple
        },

        //center map properties
        center: {
            lat: 400,
            lng: 500,
            zoom: -.7  // must be greater than or equal to minZoom
        },

        layers: {
            baselayers: {
                tenthFloor: {
                    name: 'Tenth Floor',
                    type: 'imageOverlay',
                    url: 'app/assets/images/nb_floor_10.jpg',
                    // image is 2201 x 2699
                    // keep ratio of image intact when setting bounds
                    bounds: [[0, 1000], [1226.2, 0]]
                },
                ninthFloor: {
                    name: 'Ninth Floor',
                    type: 'imageOverlay',
                    url: 'app/assets/images/floor_9.jpg',
                    // will fix this later
                    bounds: [[0, 0], [1000, 1000]]
                },
                eightFloor: {
                    name: 'Eight Floor',
                    type: 'imageOverlay',
                    url: 'app/assets/images/floor_8.jpg',
                    // will fix this later
                    bounds: [
                        [0, 347.8552729775042],
                        [-374.5753081706553, 0]
                    ]
                },
                seventhFloor: {
                    name: 'Seventh Floor',
                    type: 'imageOverlay',
                    url: 'app/assets/images/floor_7.jpg',
                    // will fix this later
                    bounds: [
                        [0, 347.8552729775042],
                        [-374.5753081706553, 0]
                    ]
                },
                sixthFloor: {
                    name: 'Sixth Floor',
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

// execute - will re-write this!
var postProcess = function ($scope, $http, leafletData, mapInteraction) {
    leafletData.getMap('map').then(function (map) {
        var info = L.control();

        info.onAdd = function (map) {
            this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"

            // var html = "<div class='btn-group-vertical'>";
            // for (var key in vavBoxes) {
            //     if(key in mapInteraction.vectorLayers) {
            //         state = 'checked';
            //     } else {
            //         state = 'unchecked';
            //     }
            //     html += "<input type='checkbox' class='vav' name='" + key + "'" + state + ">" + key + "</input><br>";
            // }
            // html += "</div>";
            //
            // this._div.innerHTML = html;
            return this._div;
        };

        info.update = function (latlong) {
            this._div.innerHTML = latlong;
        };

        map.on('mousemove', function (e) {
            info.update(e.latlng);
        });

        info.addTo(map);

        // function handleCommand() {
        //     if(this.checked) {
        //         mapInteraction.addMarkersToMap($scope, map, roomNumbers, vavBoxes, this.name);
        //     } else {
        //         mapInteraction.removeMarkersFromMap($scope, map, this.name);
        //     }
        // }
        //
        // var checkboxes = document.getElementsByClassName('vav');
        // for(var i = 0; i < checkboxes.length; i++) {
        //     checkboxes[i].addEventListener('click', handleCommand, false);
        // }
    });
};