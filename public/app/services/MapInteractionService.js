app.service('MapInteractionService', function (TableToMapService, FloorDataService, leafletData, $rootScope) {
    var self = this;

    // container for layers
    self.vectorLayers = {};

    // add specific VAV box to map
    self.addMarkersToMap = function (date) {
        $rootScope.displayDate = date;

        leafletData.getMap('map').then(function (map) {

            // go through all vavs on floor
            for (var vav in FloorDataService.vavs) {

                // if the currentDate is in that vav set
                if (date in FloorDataService.roomData[vav]) {

                    // get the markerValue of that vav
                    var markerValue = self.getMarkerValue(vav, date);
                    var color = TableToMapService.getColorFromRanges(markerValue).color;

                    // go through rooms in vav box and add markers to map
                    for (var i = 0; i < FloorDataService.vavs[vav].length; i++) {

                        var coordinates = FloorDataService.roomNumbers[FloorDataService.vavs[vav][i]];
                        var layer = self.getMarkerType(coordinates, color, markerValue, map.getZoom());

                        if (!self.vectorLayers.hasOwnProperty(vav)) {
                            self.vectorLayers[vav] = [];
                        }

                        map.addLayer(layer);
                        self.vectorLayers[vav].push(layer);
                    }
                }
            }
        });
    };

    // remove specific VAV Box from map
    self.removeMarkersFromMap = function () {

        leafletData.getMap('map').then(function (map) {
            for (var vav in FloorDataService.vavs) {
                for (var i = 0; i < self.vectorLayers[vav].length; i++) {
                    map.removeLayer(self.vectorLayers[vav][i]);
                }

                delete self.vectorLayers[vav];
            }
        });
    };

    self.getMarkerType = function (coordinates, color, currentTemp, zoom) {
        var degreeSign = String.fromCharCode(parseInt("00B0", 16));

        var object = {
            color: color,
            fillOpacity: .5
        };

        if ($rootScope.marker_type === 'Circles') {
            var latlng = L.latLng((coordinates[0][0] + coordinates[1][0]) / 2, (coordinates[0][1] + coordinates[1][1]) / 2);

            // if zoom == 0
            var radius = ((TableToMapService.getIndexOfColor(color) + 1) * 5) * .6;

            if (zoom == 1) {
                radius = ((TableToMapService.getIndexOfColor(color) + 1) * 5) * 1.2;
            } else if (zoom == 2) {
                radius = ((TableToMapService.getIndexOfColor(color) + 1) * 5) * 2.4;
            }

            return new L.circleMarker(latlng, object).setRadius(radius).bindPopup(currentTemp + degreeSign);

        } else if ($rootScope.marker_type === 'Squares') {
            return new L.rectangle(coordinates, object).bindPopup(currentTemp + degreeSign);
        }
    };

    self.getMarkerValue = function (vav, date) {
        var roomTemp = FloorDataService.roomData[vav][date];
        if ($rootScope.marker_options == 'Temp') {
            return roomTemp;
        } else if ($rootScope.marker_options == 'Temp: Inside Vs Outside') {
            return Math.abs(FloorDataService.weatherData[date] - roomTemp) * 2;
        }
    };
});