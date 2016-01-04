var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: './build/uploads/' });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// Include our static files
app.use(express.static(__dirname + '/build'));

// Serve our react app
app.get('/', function(req, res) {
	  res.sendFile(__dirname + '/index.html');
});

// Receive email for registration process
app.post('/registrationEmail', function(req, res) {
    var email = req.body.registrationEmail;

    // Send email to backend when we have the route
    //console.log("Post received: %s", email);

    // Redirect to passcode page
    res.redirect('/#/registration/code');
});

app.post('/addData', upload.single('uploadFile'), function(req, res) {
    res.json(req.body);
});

var server = app.listen(5001);

/*
* Handle errors gracefully
*/

// Regular exit
process.on('exit', function () {
    console.log('About to exit, waiting for remaining connections to complete');
    server.close();
});

// App crash
process.on('uncaughtException', function () {
    console.log('Node app crash');
    server.close();
});

// Killed in terminal
process.on('SIGTERM', function () {
    console.log('Node killed');
    server.close();
});



