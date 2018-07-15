
function returnToUnlock() {
	$("#body0").css('display', 'block');
	$("#body1").css('display', 'none');
	$("#body2").css('display', 'none');
}

function startCountDown() {
	// Set the countdown time
	var countDownTime = 30000;

	// Update the count down every 1 second
	var x = setInterval(function() {
    
    	// Substract the countDown interval from countDown date
    	var countDownInterval = 1000;
    	countDownTime = countDownTime - countDownInterval;
    
    	// Time calculations for days, hours, minutes and seconds
    	var seconds = Math.floor((countDownTime % (1000 * 60)) / 1000);
    
    	// Output the result in an element with id="demo"
    	document.getElementById("countDown").innerHTML = seconds + "s ";
    
    	// If the count down is over, unlocking is not successful
    	if (countDownTime== 0) {
        	clearInterval(x);
        	returnToUnlock();
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
	})
	.then(device => { 
		// Device is found and paired, the selected car unlocked successfully

		// Human-readable name of the device.
  		alert("FOUND: " + device.name);

  		// Attempts to connect to remote GATT Server.
  		return device.gatt.connect();
	})
	.catch(error => { console.log(error); });
}

// =================================

function startUnlocking() {

	$("#body1").css('display', 'block');
	$("#body0").css('display', 'none');
	$("#body2").css('display', 'none');

	// Look for the selected car through bluetooth
	connectToCarWithKey();

	// Meanwhile start counting down for timeout
	startCountDown();
}


$(document).ready(function() {

	

 } );