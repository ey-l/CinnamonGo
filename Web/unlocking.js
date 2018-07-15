

$(document).ready(function() {

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
    
    	// If the count down is over, write some text 
    	if (countDownTime== 0) {
        	clearInterval(x);
        	window.location.href = "readytogo.html";
    	}
	}, 1000);

 } );