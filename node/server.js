// include 'express' - a web framework for Node
var express = require('express');
var app = express();

// include middleware for parsing json
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// use this directory to serve static files
app.use(express.static('public'));

// make the server run on port 8000, localhost:8000
app.listen(8000);
console.log("Listening on 8000");

// ROUTES

// get all room JSON objects
app.get('/api/v1/room', function(req, res) {

});

// get specific room JSON object
app.get('/api/v1/rooms/:roomID', function(req, res) {

});