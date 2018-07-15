// Require express and create an instance of it
/*=======
Includes
========*/
var express = require('express');
var app = express();
var fs = require('fs');
// var http = require('http').Server(app);
var privateKey = fs.readFileSync('key.pem', 'utf8');
var certificate = fs.readFileSync('cert.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};
var https = require('https').Server(credentials, app);


/*
// on the request to root (localhost:3000/)
app.get('/', function (req, res) {
    res.send('<b>My</b> first express http server');
});

// On localhost:3000/welcome
app.get('/welcome', function (req, res) {
    res.send('<b>Hello</b> welcome to my http server made with express');
});

// Change the 404 message modifing the middleware
app.use(function(req, res, next) {
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

// start the server in the port 3000 !
app.listen(3000, function () {
    console.log('Example app listening on port 3000.');
});
*/

/*=======
Functions
========*/

/*====================
	~~Start~~
		
	Main function, it starts everything else in this program.
	
=====================*/
function Start() {	
	// Show welcome message
	//PrintBanner();

	// Start Server
	SetupServer()
}

/*====================
	~~SetupServer~~
	
	This function configures the server. 
	
	Make sure the photon keys are setup before calling requests!
	function SetupServer();
=====================*/
function SetupServer() {
	
	app.use(express.urlencoded());

	/*=====
	WEB LED CONTROLS
	======*/
	app.get('/register', function(req, res) {
		res.send("registered");
	});

	app.get('/startRent', function(req, res) {
		res.send("rent started");
	});

	app.get('/stopRent', function(req, res) {
		res.send("rent stopped");
	});

	app.get('/submitAuthorizationCode', function(req, res) {
		res.send("submit authorization code");
	});

	app.get('/checkAutorization', function(req, res) {
		res.send("check authorization");
	});
	
	/*=====
	Web file server
	======*/
	app.use(express.static('public'));
	
	/*=====
	Fire it up
	======*/
	https.listen(3000, function() {
		console.log('\n Now live at localhost:3000');
	});
}

/*====================
	~~GetJSON~~
	
	This function makes a get request to the given url, and gathers the json
	
	The function returns a promise, and the promise will resolve to the response json,
	or reject to the error.
	function GetJSON(url);
=====================*/
function GetJSON(url) {
	return new Promise(function(resolve, reject) {
		request(url, function (error, response, body) {
			if(error != "" && error != null && error != undefined) {
				reject('error:', error); // Print the error if one occurred
			}
			else if(response.statusCode == 200) {
				resolve(JSON.parse(body));
			}
			else {
				reject("Request error. Got code " + response.statusCode);
			}
		});
	});
}

/*====================
	~~PrintBanner~~
	
	This function prints an awesome banner
	
	function PrintBanner();
=====================*/
/*function PrintBanner() {
	console.log(fs.readFileSync('Welcome.txt', 'utf8'));
}
*/

Start();