// include 'express' - a web framework for Node
var express = require('express');
var app = express();

// utility to read and write to files
var fs = require('fs');

// utility for asynchronous operations
var async = require('async');

// include middleware for parsing json
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// use this directory to serve static files
app.use(express.static('public'));

// make the server run on port 8000, localhost:8000
app.listen(8000);
console.log("Listening on 8000");

// ROUTES

var vav = {};

vav.floor10 = [
    '47102', '47103', '47104', '47105', '47106',
    '47107', '47108', '47109', '47110', '47111',
    '47112', '47113',          '47115', '47116',
    '47117', '47118', '47119', '47120', '47121',
    '47122', '47123', '47124', '47125', '47201',

    '48101', '48102', '48103', '48104', '48105',
    '48106', '48107', '48108', '48109', '48110',
    '48111', '48112', '48113', '48114', '48115',
    '48116', '48117', '48118', '48119', '48120',
    '48122', '48123', '48124', '48125', '48201'
];

// get all room JSON objects
app.get('/api/v1/rooms', function(req, res) {
    var object = {};
    console.log('received request!');

    var count = 0;

    async.whilst(
        function() { return count < vav.floor10.length; },

        function(callback) {
            fs.readFile('node/data/room' + vav.floor10[count] + '.csv', 'utf-8', function(err, data) {
                if(err) {
                    console.log(err);
                } else {
                    object[vav.floor10[count]] = data;
                }
                
                count++;
                callback();
            });
        },
        
        function() {
            res.send(object);
        }
    );
});

// get specific room JSON object
app.get('/api/v1/rooms/:roomID', function(req, res) {

});