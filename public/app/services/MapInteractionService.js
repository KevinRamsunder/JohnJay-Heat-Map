app.service('mapInteraction', function(tableToMapService) {
    var self = this;

    // if currently loading csv files set true
    self.loading = false;
    self.makingRequest = false;

    // container for layers
    self.vectorLayers = {};

    self.marker_type = 'Circles';
    self.marker_options = 'Temp';

    // add specific VAV box to map
    self.addVavBoxToMap = function($scope, map, roomNumbers, vavBoxes, vav, color, currentTemp) {
        for (var i = 0; i < vavBoxes[vav].length; i++) {
            var coordinates = roomNumbers[vavBoxes[vav][i]];
            var degreeSign = String.fromCharCode(parseInt("00B0", 16));
            var layer = null;

            var object = {
                color: color,
                fillOpacity: .5
            };

            if (self.marker_type === 'Circles') {
                var latlng = L.latLng((coordinates[0][0]+coordinates[1][0])/2, (coordinates[0][1]+coordinates[1][1])/2);
                var radius = (tableToMapService.getIndexOfColor(color) + 1) * 5;

                if (map.getZoom() == 2) {
                    radius *= 2;
                } else if (map.getZoom() == 3) {
                    radius *= 3
                }
                layer = new L.circleMarker(latlng, object).setRadius(radius).bindPopup(currentTemp + degreeSign);

            } else if (self.marker_type === 'Squares') {
                layer = new L.rectangle(coordinates, object).bindPopup(currentTemp + degreeSign);
            }

            if (!self.vectorLayers.hasOwnProperty(vav)) {
                self.vectorLayers[vav] = [];
            }

            map.addLayer(layer);
            self.vectorLayers[vav].push(layer);
        }
    };

    // go through object and add vector shapes to map
    self.addAllVavsToMap = function($scope, map, roomNumbers, vavBoxes) {
        for (var vav in vavBoxes) {
            self.addVavBoxToMap($scope, map, roomNumbers, vavBoxes, vav);
        }
    };

    // remove specific VAV Box from map
    self.removeVavBoxFromMap = function($scope, map, vavBox) {
        if(self.vectorLayers[vavBox] === undefined) {
            return;
        }

        for (var i = 0; i < self.vectorLayers[vavBox].length; i++) {
            map.removeLayer(self.vectorLayers[vavBox][i]);
        }

        delete self.vectorLayers[vavBox];
    };
});