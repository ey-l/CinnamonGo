/*================================

	Globals
	
=================================*/
var connected = false;
var gattServer = undefined;
var gattService = undefined;

/*================================

	Raspberry Pi BLE Functions
	
=================================*/
function connectToCarWithKey(carKey) {
	navigator.bluetooth.requestDevice({
		filters: [{
    		name: carKey
  		}],
  		optionalServices: ['ffffffff-ffff-ffff-ffff-fffffffffff0']
	})
	.then(device => { 
		// Human-readable name of the device.
  		console.log("FOUND: " + device.name);
  		
  		document.getElementById("outputDiv").innerText = "Found Device:" + device.name;

  		// Attempts to connect to remote GATT Server.
  		return device.gatt.connect();
  		
	})
	.then(function(server) {
		gattServer = server;
		connected = true;
		return server.getPrimaryService('ffffffff-ffff-ffff-ffff-fffffffffff0')
	})
	.then(function(service) {
		gattService = service;
		return service.getCharacteristic('ffffffff-ffff-ffff-ffff-fffffffffff1');
	})
	.then(service => )
	.then(characteristic => characteristic.getDescriptor('ffffffff-ffff-ffff-ffff-fffffffffff2'))
	.then(descriptor => descriptor.readValue())
	.then(value => {
  		let decoder = new TextDecoder('utf-8');
  		document.getElementById("outputDiv").innerText += decoder.decode(value);
  		console.log('User Description: ' + decoder.decode(value));
  		writeToCar('Hello Car!');
  	})
	.catch(error => {
		console.log(error);
  		document.getElementById("outputDiv").innerText += "Error:" + error;		
	});
}

function writeToCar(msg) {
	if(connected) {
		gattService.getCharacteristic('ffffffff-ffff-ffff-ffff-fffffffffff3')
		.then(characteristic => characteristic.getDescriptor('ffffffff-ffff-ffff-ffff-fffffffffff4'))
		.then(descriptor => {
			let encoder = new TextEncoder('utf-8');
			let userReply = encoder.encode(msg);
			return descriptor.writeValue(userReply);
		})

		.then(descriptor => descriptor.readValue())
		.then(value => {
			let decoder = new TextDecoder('utf-8');
			document.getElementById("outputDiv").innerText += decoder.decode(value);
			console.log('User Description: ' + decoder.decode(value));
			writeToCar('Hello Car!');
		})
		.catch(function(err) {
			console.log(err);
		});
	}
	else {
		throw "Not connected yet..."
	}
}