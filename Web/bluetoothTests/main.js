
/*================================

	FitBit Test Functions
	
=================================*/

function printNameOfDevice() {
	navigator.bluetooth.requestDevice({
  	filters: [{
    	name: 'Alta HR'
  	}],
  	optionalServices: ['battery_service']
	})
	.then(device => { 
		// Human-readable name of the device.
  		console.log(device.name);

  		// Attempts to connect to remote GATT Server.
  		return device.gatt.connect();
	})
	.catch(error => { console.log(error); });
}

function getBatteryLevel() {

	
	
	navigator.bluetooth.requestDevice({
  	filters: [{
    	name: 'Alta HR'
  	}],
  	optionalServices: ['battery_service']
	})
	.then(device => device.gatt.connect())
	.then(server => {

  		// Getting Battery Service...
  		return server.getPrimaryService('battery_service');
	})
	.then(service => {

  		// Getting Battery Level Characteristic...
  		return service.getCharacteristic('battery_level');
	})
	.then(characteristic => {
  		// Reading Battery Level...
  		return characteristic.readValue();
	})
	.then(value => {
  		console.log('Battery percentage is ' + value.getUint8(0));
	})
	.catch(error => { console.log(error); });
	

}

/*================================

	Raspberry Pi Test Functions
	
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
	.then(server => server.getPrimaryService('ffffffff-ffff-ffff-ffff-fffffffffff0'))
	.then(service => service.getCharacteristic('ffffffff-ffff-ffff-ffff-fffffffffff1'))
	.then(characteristic => characteristic.getDescriptor('ffffffff-ffff-ffff-ffff-fffffffffff2'))
	.then(descriptor => descriptor.readValue())
	.then(value => {
  		let decoder = new TextDecoder('utf-8');
  		document.getElementById("outputDiv").innerText += decoder.decode(value);
  		console.log('User Description: ' + decoder.decode(value));
  	})
	.catch(error => {
		console.log(error);
  		document.getElementById("outputDiv").innerText += "Error:" + error;		
	});
}