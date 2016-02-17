// include 'express', a web framework for Node
var express = require('express');
var app = express();

// use this directory to serve static files
app.use(express.static('public'));

// make the server run on port 8000, localhost:8000
app.listen(8000);
console.log("Listening on 8000");