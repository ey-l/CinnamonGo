const bleno = require("bleno");

/*=====================
Major globals variables
======================*/

const UUID = 'fffffffffffffffffffffffffffffff0'; // set your own value
const MINOR = 2; // set your own value
const MAJOR = 1; // set your own value
const TX_POWER = -60; // just declare transmit power in dBm

var name = 'CinnamonGoCar';
var serviceUuids = ['fffffffffffffffffffffffffffffff0']


/*=====================
Descriptor
======================*/

var Descriptor = bleno.Descriptor;

var descriptor = new Descriptor({
    uuid: '2901',
    value: 'Hello World' // static value, must be of type Buffer or string if set
});

/*=====================
Characteristics
======================*/
var Characteristic = bleno.Characteristic;

var characteristic = new Characteristic({
    uuid: 'fffffffffffffffffffffffffffffff1', // or 'fff1' for 16-bit
    properties: [ 'read' ], // can be a combination of 'read', 'write', 'writeWithoutResponse', 'notify', 'indicate'
    secure: [ 'read' ], // enable security for properties, can be a combination of 'read', 'write', 'writeWithoutResponse', 'notify', 'indicate'
    value: null, // optional static value, must be of type Buffer - for read only characteristics
    descriptors: [
        descriptor
    ],
    onReadRequest: function() {
    	console.log("Someone asked to read!");
    }, // optional read request handler, function(offset, callback) { ... }
    onWriteRequest: null, // optional write request handler, function(data, offset, withoutResponse, callback) { ...}
    onSubscribe: null, // optional notify/indicate subscribe handler, function(maxValueSize, updateValueCallback) { ...}
    onUnsubscribe: null, // optional notify/indicate unsubscribe handler, function() { ...}
    onNotify: null, // optional notify sent handler, function() { ...}
    onIndicate: null // optional indicate confirmation received handler, function() { ...}
});

/*=====================
Services
======================*/

var PrimaryService = bleno.PrimaryService;

var primaryService = new PrimaryService({
    uuid: 'fffffffffffffffffffffffffffffff0', // or 'fff0' for 16-bit
    characteristics: [
        characteristic
    ]
});

/*=====================
Main handlers
======================*/

console.log("Starting bleno...");

bleno.on("stateChange", state => {
	if (state === 'poweredOn') {
		console.log("Starting broadcast...");
		bleno.startAdvertising(name, serviceUuids);
	} else {
		console.log("Stopping broadcast...");
		bleno.stopAdvertising();
	}        
});

bleno.on('advertisingStart', function(error) {
	console.log("Advertising has started.");
	if(error) {
		console.log(error);
	}
});

bleno.on('advertisingStop', function() {
	console.log("Advertising has stopped.");	
});

bleno.on('accept', function(clientAddress) {
	console.log("Hooray! someone connected! Address:");
	console.log(clientAddress);
});