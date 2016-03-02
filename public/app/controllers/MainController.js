// create and link 'MainController' controller to angular application
app.controller('MainController', mainController);

// inject dependencies into 'MainController' controller
mainController.$inject = ['$scope', '$http', 'leafletData', 'leafletBoundsHelpers', 'tableToMapService'];

// controller function
function mainController($scope, $http, leafletData, leafletBoundsHelpers, tableToMapService) {
    // save context
    var self = this;

    $scope.currentDate = "";

    // container for layers
    $scope.vectorLayers = {};

    // add map properties to scope
    initMap($scope);

    // post-processing
    postProcess($scope, $http, leafletData);

    $http.get('/api/v1/rooms').then(function(response) {
        var masterData = response.data;

        leafletData.getMap('map').then(function(map) {
            var data = getJSON($scope, $http).then(function(response) {
                var mappedCSV = {};
                
                for(var key in masterData) {
                    mappedCSV[key] = masterData[key].split(',');
                }

                for(var key in masterData) {
                    var results = mappedCSV[key];

                    var firstDate = results[0];
                    var firstTemp = results[1];

                    if(firstDate !== '2013-06-06 00:00:00') {
                        continue;
                    } else {
                        removeVavBoxFromMap($scope, map, key);
                        addVavBoxToMap($scope, map, response.roomNumbers.data, response.vavBoxes.data, key, tableToMapService.getColorFromRanges(firstTemp).color); 
                    }
                }

                var current = 0;
                var length = mappedCSV['47102'].length;

                var animation = setInterval(function() {
                    var i = current;
                    var j = current + 1;
                    current += 2;
                    console.log('animating',i,j)

                    for(var key in masterData) {
                        var results = mappedCSV[key];

                        var firstDate = results[i];
                        var firstTemp = results[j];

                        if(results[0] !== '2013-06-06 00:00:00') {
                            continue;
                        } else {
                            $scope.currentDate = results[i];
                            removeVavBoxFromMap($scope, map, key);
                            addVavBoxToMap($scope, map, response.roomNumbers.data, response.vavBoxes.data, key, tableToMapService.getColorFromRanges(firstTemp).color); 
                        }
                    }

                    if(current >= length) clearInterval(animation);
                }, 50);
            });
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
                    bounds: [
                        [0, 347.8552729775042],
                        [-374.5753081706553, 0]
                    ]
                }
            }
        }
    });
};

// get json files from local storage
var getJSON = function($scope, $http) {
    // function to make http call to get content of JSON
    return getRoomDataFromJson = new Promise(function(resolve, reject) {
        $http.get('app/assets/json/floor_10/room_num.json').then(function(response) {
            var roomNumbers = response;
            $http.get('app/assets/json/floor_10/vav.json').then(function(response) {
                resolve({'roomNumbers': roomNumbers, 'vavBoxes': response});
            });
        });
    });
};

// go through object and add vector shapes to map
var addAllVavsToMap = function($scope, map, roomNumbers, vavBoxes) {
    for (var vav in vavBoxes) {
        addVavBoxToMap($scope, map, roomNumbers, vavBoxes, vav);
    }
};

// add specific VAV box to map
var addVavBoxToMap = function($scope, map, roomNumbers, vavBoxes, vav, color) {
    if(vavBoxes[vav] === undefined) {
        return;
    }

    for (var i = 0; i < vavBoxes[vav].length; i++) {
        var coordinates = roomNumbers[vavBoxes[vav][i]];

        if(color === undefined) {
            color = "#" + ((1 << 24) * Math.random() | 0).toString(16);
        }

        var object = {
            color: color,
            fillOpacity: .5
        };

        if (coordinates.length === 2) {
            var layer = new L.rectangle(coordinates, object);
        } else {
            var layer = new L.polygon(coordinates, object);
        }

        if (!$scope.vectorLayers.hasOwnProperty(vav)) {
            $scope.vectorLayers[vav] = [];
        }

        map.addLayer(layer);
        $scope.vectorLayers[vav].push(layer);
    }
};

// remove specific VAV Box from map
var removeVavBoxFromMap = function($scope, map, vavBox) {
    if($scope.vectorLayers[vavBox] === undefined) {
        return;
    }

    for (var i = 0; i < $scope.vectorLayers[vavBox].length; i++) {
        map.removeLayer($scope.vectorLayers[vavBox][i]);
    }

    delete $scope.vectorLayers[vavBox];
};

// execute - will re-write this!
var postProcess = function($scope, $http, leafletData) {
    leafletData.getMap('map').then(function(map) {
        var data = getJSON($scope, $http).then(function(response) {
            var roomNumbers = response.roomNumbers.data;
            var vavBoxes = response.vavBoxes.data;
            addAllVavsToMap($scope, map, roomNumbers, vavBoxes);

            var info = L.control();

            info.onAdd = function(map) {
                this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"

                var html = "<div class='btn-group-vertical'>";
                for (var key in vavBoxes) {
                    if(key in $scope.vectorLayers) {
                        state = 'checked';
                    } else {
                        state = 'unchecked';
                    }
                    html += "<input type='checkbox' class='vav' name='" + key + "'" + state + ">" + key + "</input><br>";
                }
                html += "</div>";

                this._div.innerHTML = html;
                return this._div;
            };

            info.addTo(map);

            function handleCommand() {
                if(this.checked) {
                    addVavBoxToMap($scope, map, roomNumbers, vavBoxes, this.name);
                } else {
                    removeVavBoxFromMap($scope, map, this.name);
                }
            };

            var checkboxes = document.getElementsByClassName('vav');
            for(var i = 0; i < checkboxes.length; i++) {
                checkboxes[i].addEventListener('click', handleCommand, false);
            }
            
        });
    });
};