
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
	.then(device => device.gatt.connect())
	.then(server => server.getPrimaryService('fffffffffffffffffffffffffffffff0'))
	.then(service => service.getCharacteristic('fffffffffffffffffffffffffffffff1'))
	.then(characteristic => characteristic.getDescriptor('2901'))
	.then(descriptor => descriptor.readValue())
	.then(value => {
  		let decoder = new TextDecoder('utf-8');
  		console.log('User Description: ' + decoder.decode(value));
  	})
	.catch(error => { console.log(error); });
}