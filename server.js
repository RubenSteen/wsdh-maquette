require('dotenv').config();
const express = require('express');
const path = require('path');
const host = '0.0.0.0';
const port = 3000;
const app = express();

const Phidget = require('./phidget.js')

const phidgetServerDisable = process.env.PHIDGET_SERVER_DISABLE || false;
const phidgetServerIP = process.env.PHIDGET_SERVER_IP || "localhost";
const phidgetServerPort = process.env.PHIDGET_SERVER_PORT || 5661;
const phidgetServerName = process.env.PHIDGET_SERVER_NAME || "";
const phidgetServerPassword = process.env.PHIDGET_SERVER_PASSWORD || "";

// serve static assets normally
app.use(express.static(__dirname + '/app/dist'));

app.get('/foobar', (request, response) => {
  response.send('hello world')
})

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(port, host);
console.log("Node server started on " + process.env.APP_PORT);

var phidget22 = require('phidget22');

var conn = new phidget22.Connection({
	hostname: phidgetServerIP,
	port: phidgetServerPort,
	name: phidgetServerName,
	passwd: phidgetServerPassword,
	onAuthenticationNeeded: function() { return "password"; },
	onError: function(code, msg) { console.error("Connection Error:", msg); },
	onConnect: function() { console.log("Connected to the phidget server on " + phidgetServerIP + ":" + phidgetServerPort); },
	onDisconnect: function() { console.log("Disconnected"); }
});

if (!phidgetServerDisable) {
	conn.connect().catch(function(err) {
		console.error(err);
	});
}