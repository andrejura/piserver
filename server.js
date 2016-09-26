//Lets require/import the HTTP module
var http = require('http');
var port = process.env.PORT || 8080;
var fs = require('fs');
var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, '/public')));

app.get("/login", function(req, res) {
    if (checkUserData(req.param("username"), req.param("password"))) {
    res.send("deluje?");
    }
});

app.get('*', function(req, res) {
    res.send('Not yet available.');
});

app.listen(port);

// Console will print the message
console.log('Server running on port ' + port);

var userDataServ = [{"u": "Andrej", "p": "123456"}];

function checkUserData(username, password) {
    /*fs.readFileSync("public/userData.json", "utf-8", function(err, data) {
        userDataServ = JSON.parse("data");
    });*/
    console.log(userDataServ);
    for (var i = 0; i < userDataServ.length; i++) {
        if (username == userDataServ[i].u && password == userDataServ[i].p) {
            console.log("works");
            return true;
        }
    }
    return false;
}