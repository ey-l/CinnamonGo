
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
	})
	.then(device => { 
		// Human-readable name of the device.
  		console.log("FOUND: " + device.name);

  		// Attempts to connect to remote GATT Server.
  		return device.gatt.connect();
	})
	.catch(error => { console.log(error); });
}