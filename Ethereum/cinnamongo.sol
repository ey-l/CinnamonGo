pragma solidity ^0.4.11;
// We have to specify what version of compiler this code will compile with

contract CinnamonGo {

	//Money stuff
	address public carDevice;
	mapping (address => uint) public balances;

	// Signup stuff
	bool public isRented;
	uint public authorizationCode;
	address public currentUser;
	
	// Counting time stuff
	uint256 public startTime;
	uint256 public endTime;
	
	//Misc
	address public previousUser;
	
	
	//Events
	event authorizeRequest(uint authorizationKey);
	event authorizeSuccess();
	
	/* This is the constructor which will be called once when you
	*/
	function CinnamonGo() {
		carDevice = msg.sender;
		balances[msg.sender] = 1000;
	}
	
	function register() returns (bool) {
		balances[msg.sender] = 1000;
		return true;
	}
	
	// This function returns the total votes a candidate has received so far
	function startRent() returns (bool) {
		if (isRented == true) return false;
		currentUser = msg.sender;
		startTime = block.timestamp;
		isRented = true;
		return true;
	}
	
	function submitAuthorizationCode(uint authorizationKey) returns (bool) {
		if (currentUser != carDevice) {
			emit authorizeRequest(authorizationKey);
			return true;
		}
		else {
			// Not allowed
			return false;
		}
	}
	
	function authorize() returns (bool) {
		if (msg.sender == carDevice) {
			emit authorizeSuccess();
			return true;
		}
		else {
			// Not allowed
			return false;
		}
	}
	
	function stopRent() returns (uint) {
		endTime = block.timestamp;
		balances[currentUser] -= endTime - startTime;
		balances[carDevice] += endTime - startTime;
		previousUser = currentUser;
		currentUser = carDevice;
		isRented = false;
		return balances[previousUser];
	}
}
