//Lets require/import the HTTP module
var http = require('http');
var port = process.env.PORT;
var fs = require('fs');
var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, '/public')));
app.get('*', function(req, res) {
    res.send('Hello World');
})

app.listen(port);

// Console will print the message
console.log('Server running on port ' + port);

