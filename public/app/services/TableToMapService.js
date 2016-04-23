// service for table to map communication
app.service('TableToMapService', function() {
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

        // error value
        return {color: '#0000ff'};
    };

    // get the index of the given color code from the table, used for circle scaling
    self.getIndexOfColor = function(colorCode) {
        var colors = self.getColors();
        return colors.indexOf(colorCode);
    }

    // attach event listeners to color-picker elements
    $('.color-picker').colorpicker().on('changeColor.colorpicker', function(event) {
        console.log(event.color.toHex());
    });
});