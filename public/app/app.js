// connect angular application to index.html and include needed libraries
var app = angular.module('app', ['leaflet-directive']);

app.service('mapInteraction', function() {
    var self = this;

    // data returned
    self.data = {};

    // if currently loading csv files set true
    self.loading = false;
    self.makingRequest = false;

    // container for layers
    self.vectorLayers = {};

    // add specific VAV box to map
    self.addVavBoxToMap = function($scope, map, roomNumbers, vavBoxes, vav, color, currentTemp) {
        // Alessandro's function
        if(currentTemp !== undefined) {
            console.log(currentTemp);

            // exit function (remove if you want)
            return;
        }

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
                // var layer = new L.rectangle(coordinates, object);
                var latlng = L.latLng((coordinates[0][0]+coordinates[1][0])/2, (coordinates[0][1]+coordinates[1][1])/2);
                var layer = new L.circle(latlng, 500, object)
            } else {
                var layer = new L.polygon(coordinates, object);
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

// service for table to map communication
app.service('tableToMapService', function() {
    var self = this;

    // get colors from each row in the table
    self.getColors = function() {
        var colors = [];
        var colorChoices = $('.color-picker>input');

        for(var i = 0; i < colorChoices.length; i++) {
            colors.push(colorChoices[i].value);
        }

        return colors;
    };

    // get ranges from each row in the table
    self.calculateRanges = function() {
        var limits = [];
        var lowerLimits = $('input.range-number:even()');
        var upperLimits = $('input.range-number:odd()');

        for(var i = 0; i < lowerLimits.length; i++) {
            limits.push([lowerLimits[i].value, upperLimits[i].value]);
        }

        return limits;
    };

    // find which range a given color belongs in
    self.getColorFromRanges = function(temperature) {
        temperature = parseInt(temperature);

        var colors = self.getColors();
        var limits = self.calculateRanges();

        for(var i = 0; i < limits.length; i++) {
            if(temperature >= parseInt(limits[i][0]) && temperature <= parseInt(limits[i][1])) {
                return {color: colors[i], lower: limits[i][0], upper: limits[i][1]};
            }
        }

        return {color: '#0000ff'};
    };

    // attach event listeners to color-picker elements
    $('.color-picker').colorpicker().on('changeColor.colorpicker', function(event) {
        console.log(event.color.toHex());
    });
});
