var csv = require('csv');
var fs = require('fs');

console.log('App started.');

fs.readFile('data.csv', function(err, data) {
    if(err) {
        console.log(err);
    } else {
        console.log('Data successfully parsed.');
        parse(data);
    }
});

var parse = function(data) {
    csv.parse(data, function(err, data) {
        if(err) {
            console.log(err);
        } else {
            console.log('CSV processing complete.');
            process(data);
        }
    });
};

var process = function(csvObject) {
    var map = {};

    for(var i = 0; i < csvObject.length; i++) {
        var date = csvObject[i][0];
        var temp = csvObject[i][1];

        date = date.substring(0, date.indexOf(' '));

        if(map.hasOwnProperty(date)) {
            map[date]['avg'] += parseInt(temp);
            map[date]['count']++;
        } else {
            var obj = {'avg': parseInt(temp), 'count': 1};
            map[date] = obj; 
        }
    }

    for(var date in map) {
        map[date]['avg'] = map[date]['avg'] / map[date]['count'];
    }

    console.log(map);
}