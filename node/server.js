// include 'express' - a web framework for Node
var express = require('express');
var app = express();

// utility to read and write to files
var fs = require('fs');

var path = require('path');
var request = require('request');

// utility for asynchronous operations
var async = require('async');

// include middleware for parsing json
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// use this directory to serve static files
app.use(express.static('public'));

// make the server run on port 8000, localhost:8000
var port = process.env.PORT || 8000;
app.listen(port);
console.log("listening on port " + port);

app.use('/node/data', express.static('node/data'));

// get all room JSON objects
app.post('/api/v1/rooms', function (req, res) {
    var roomData = {};
    var count = 0;
    var url = 'node/data/' + req.body.floorLevel;

    fs.readFile(url + '/vav.json', 'utf-8', function (err, data) {
        var vav = Object.keys(JSON.parse(data)); // ['47101, 47102, ...']

        async.whilst(
            function () {
                return count < vav.length;
            },

            function (callback) {
                fs.readFile(url + '/room_data/Room' + vav[count] + '.csv', 'utf-8', function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        roomData[vav[count]] = data;
                    }

                    count++;
                    callback();
                });
            },

            function () {
                var tempData = {};

                for (var key in roomData) {
                    tempData[key] = roomData[key].split(',');
                    tempData[key] = tempData[key].map(function (i) {
                        return i.trim()
                    });

                    var floorData = {};
                    for (var i = 0; i < tempData[key].length - 1; i += 2) {
                        floorData[tempData[key][i]] = tempData[key][i + 1];
                    }

                    // floorData = {'2013-06-06 00:00:00': '73.13', ...}
                    roomData[key] = floorData;
                }

                // {vav: "date, temp, date, temp", vav : "date, temp", ...}
                res.send(roomData);
            }
        );
    });
});

// route to get room numbers and vav coordinates
app.post('/api/v1/coordinates', function (req, res) {
    var url = 'node/data/' + req.body.floorLevel;
    fs.readFile(url + '/room_num.json', 'utf-8', function (err, data) {
        var room_num = JSON.parse(data);

        fs.readFile(url + '/vav.json', 'utf-8', function (err, data) {
            var vav = JSON.parse(data);
            res.send({'room_num': room_num, 'vav': vav});
        });
    });
});

// get weather data csv
app.get('/api/v1/weather-data', function (req, res) {
    fs.readFile('node/data/weather-data/weather.json', 'utf-8', function (err, data) {
        res.send(data);
    });
});