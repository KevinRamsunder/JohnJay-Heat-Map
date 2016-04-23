// include 'express' - a web framework for Node
var express = require('express');
var app = express();

// utility to read and write to files
var fs = require('fs');

var path = require('path');
var request = require('request');

// utility for asynchronous operations
var async = require('async');

// var weather_source_api_key = require('./env');

// include middleware for parsing json
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// use this directory to serve static files
app.use(express.static('public'));
app.use('/bower_components', express.static('bower_components'));

// make the server run on port 8000, localhost:8000
var port = process.env.PORT || 8000;
app.listen(port);

// ROUTES

var vav = {};

vav.floor10 = [
    '47102', '47103', '47104', '47105', '47106',
    '47107', '47108', '47109', '47110', '47111',
    '47112', '47113', '47115', '47116',
    '47117', '47118', '47119', '47120', '47121',
    '47122', '47123', '47124', '47125', '47201',

    '48101', '48102', '48103', '48104', '48105',
    '48106', '48107', '48108', '48109', '48110',
    '48111', '48112', '48113', '48114', '48115',
    '48116', '48117', '48118', '48119', '48120',
    '48122', '48123', '48124', '48125', '48201'
];

app.use('/node/data', express.static('node/data'));

// get all room JSON objects
app.get('/api/v1/rooms', function (req, res) {
    // allRoomData {vav: "date, temp, date, temp", vav : "date, temp", ...}
    var allRoomData = {};

    console.log('room data requested');

    var count = 0;

    async.whilst(
        function () {
            return count < vav.floor10.length;
        },

        function (callback) {
            fs.readFile('node/data/Room' + vav.floor10[count] + '.csv', 'utf-8', function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    allRoomData[vav.floor10[count]] = data;
                }

                count++;
                callback();
            });
        },

        function () {
            var currentFloorDates = [];
            var currentFloorData = {};
            var tempData = {};
            var do_once = true;

            for (var key in allRoomData) {
                tempData[key] = allRoomData[key].split(',');
                tempData[key] = tempData[key].map(function (i) {
                    return i.trim()
                });

                var floorData = {};
                for (var i = 0; i < tempData[key].length - 1; i += 2) {
                    floorData[tempData[key][i]] = tempData[key][i + 1];

                    if (do_once) {
                        currentFloorDates.push(tempData[key][i])
                    }
                }

                do_once = false;
                currentFloorData[key] = floorData;
            }

            var sendData = {};

            // [2013-06-06 00:00:00", "2013-06-06 01:00:00", ...]
            sendData['Dates'] = currentFloorDates;

            // {vav: {date: temp, date2: temp2, ...}, vav: {date: temp, ...}}
            sendData['Data'] = currentFloorData;

            res.send(sendData);
        }
    );
});

// get weather data csv
app.get('/api/v1/weather-data', function (req, res) {
    console.log('weather data requested');

    fs.readFile('node/data/weather-data/weather.json', 'utf-8', function (err, data) {
        res.send(data);
    });
});