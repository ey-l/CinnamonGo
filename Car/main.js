const bleno = require("bleno");
Web3 = require('web3');

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

var descriptorFromCar = new Descriptor({
    uuid: 'fffffffffffffffffffffffffffffff2',
    value: 'Hello Phone!' // static value, must be of type Buffer or string if set
});

var descriptorToCar = new Descriptor({
    uuid: 'fffffffffffffffffffffffffffffff4',
    value: ''
});

/*=====================
Characteristics
======================*/
var Characteristic = bleno.Characteristic;

var characteristicFromCar = new Characteristic({
    uuid: 'fffffffffffffffffffffffffffffff1', // or 'fff1' for 16-bit
    properties: [ 'read' ], // can be a combination of 'read', 'write', 'writeWithoutResponse', 'notify', 'indicate'
    secure: [ 'read' ], // enable security for properties, can be a combination of 'read', 'write', 'writeWithoutResponse', 'notify', 'indicate'
    value: null, // optional static value, must be of type Buffer - for read only characteristics
    descriptors: [
        descriptorFromCar
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

var characteristicToCar = new Characteristic({
    uuid: 'fffffffffffffffffffffffffffffff3', 
    properties: [ 'write', 'read' ], // can be a combination of 'read', 'write', 'writeWithoutResponse', 'notify', 'indicate'
    secure: [ 'write', 'read' ], // enable security for properties, can be a combination of 'read', 'write', 'writeWithoutResponse', 'notify', 'indicate'
    value: null,
    descriptors: [
    	descriptorToCar
    ],
    onReadRequest: function() {
    	console.log("Someone Requested to read!");
    }, // optional read request handler, function(offset, callback) { ... }
    onWriteRequest: function() {
    	console.log("Someone Requested to write!");
    }, // optional write request handler, function(data, offset, withoutResponse, callback) { ...}
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
        characteristicToCar, characteristicFromCar
    ]
});

/*=====================
Main handlers
======================*/

console.log("Starting bleno...");

bleno.setServices([primaryService]);

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

bleno.on('disconnect', function(clientAddress) {
	console.log("Someone just disconnected... Address:");
	console.log(clientAddress);
});

/*===========

SETUP CONTRACT

============*/

web3 = new Web3(new Web3.providers.HttpProvider("http://216.71.221.203:8545"));
fs = require('fs');
code = fs.readFileSync('cinnamongo.sol').toString();
solc = require('solc');
compiledCode = solc.compile(code);
abiDefinition = JSON.parse(compiledCode.contracts[':CinnamonGo'].interface);
Contract = web3.eth.contract(abiDefinition);
byteCode = compiledCode.contracts[':CinnamonGo'].bytecode;
deployedContract = Contract.new(5,{data: byteCode, from: web3.eth.accounts[0], gas: 4700000});
console.log("CONTRACT DEPLOYED")
console.log(deployedContract.address);
contractInstance = Contract.at(deployedContract.address);
