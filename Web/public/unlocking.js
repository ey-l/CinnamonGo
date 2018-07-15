/*================================

	Globals
	
=================================*/
// bluetooth
var connected = false;
var gattServer = undefined;
var gattService = undefined;

// countdown interval
//var countDownTime = 0;
var x = null;


function returnToUnlock() {
	$("#body0").css('display', 'block');
	$("#body1").css('display', 'none');
	$("#body2").css('display', 'none');
	$("#body3").css('display', 'none');
}

function doneUnlocking() {
	// clear the countdown 
	clearInterval(x);

	// show unlocking succeed msg
	$("#body0").css('display', 'none');
	$("#body1").css('display', 'none');
	$("#body2").css('display', 'block');
	$("#body3").css('display', 'none');

	// mimic the motor after 20 seconds
	setTimeout( function() {
		$("#body3").css('display', 'block');
		$("#body2").css('display', 'none');
	}, 15000);
}

function startCountDown(x) {
	// Set the countdown time
	var countDownTime = 30000;

	// Update the count down every 1 second
	x = setInterval(function() {
    
    	// Substract the countDown interval from countDown date
    	var countDownInterval = 1000;
    	countDownTime = countDownTime - countDownInterval;
    
    	// Time calculations for days, hours, minutes and seconds
    	var seconds = Math.floor((countDownTime % (1000 * 60)) / 1000);
    
    	// Output the result in an element with id="demo"
    	document.getElementById("countDown").innerHTML = seconds + "s ";
    
    	// If the count down is over, unlocking is not successful
    	if (countDownTime == 0) {
        	clearInterval(x);

        	if (!connected) {
        		returnToUnlock();
        	}
    	}
	}, 1000);
}

/*================================

	Raspberry Pi Test Functions
	
=================================*/
function connectToCarWithKey() {
	navigator.bluetooth.requestDevice({
  	filters: [{
    	name: "CinnamonGoCar"
  		}],
  		optionalServices: ['ffffffff-ffff-ffff-ffff-fffffffffff0']
	})
	.then(device => { 

		// Human-readable name of the device.
  		//alert("FOUND: " + device.name);

  		// Device is found and paired, the selected car unlocked successfully
  		doneUnlocking();

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
	.then(characteristic => characteristic.getDescriptor('ffffffff-ffff-ffff-ffff-fffffffffff2'))
	.then(descriptor => descriptor.readValue())
	.then(value => {
  		let decoder = new TextDecoder('utf-8');
  		document.getElementById("outputDiv").innerText += decoder.decode(value);
  		console.log('User Description: ' + decoder.decode(value));
  		return gattService.getCharacteristic('ffffffff-ffff-ffff-ffff-fffffffffff3');
  	})
	.catch(error => { console.log(error); });
}

// =================================

function startUnlocking() {

	$("#body1").css('display', 'block');
	$("#body0").css('display', 'none');

	// Look for the selected car through bluetooth
	connectToCarWithKey();

	// Meanwhile start counting down for timeout
	startCountDown(x);
}


$(document).ready(function() {

	

 } );