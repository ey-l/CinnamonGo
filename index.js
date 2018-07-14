// import a package to js files
const axios = require('axios');

var x = 5;
var y = 10;

document.getElementById("hey").innerHTML= typeof x;


// an array: can be different type
var arr = [1, 2, 3]
// an object: is a group of key-value pair
var obj = {firstname:"Vo", lastname:"See", age:3}


if (x == y){
	console.log("hey");
}

// scope: var only exists in a code block

// do while, do first and then evaluate the condition
//do{

//}while()

function printOne() {
	console.log("hello world")
}

// to run it
// printOne()

function helloWorld() {
	console.log("hello World");
}

setTimeOut(helloWorld, 5000)  // 5000 in millisecond

// to construct a promise
function numberAddOne(num) {
	return new Promise((fulfill, reject) => {
		fulfill(num + 1);
	})
}
// a promise is a lamda function; a better way to do it because of binding
// this is a function
var k = (num)=>{return num++}
// use it
k(2)
// promise must have ful and rej two params

// to consume a promise
// ful or rej the result 
numberAddOne(1).then((result)=> {
	console.log(result)
}).catch((err)=>{
	console.log("error: ", err)
})

// axios
axios.post("url", {
	// config 
	headers: {
		"Content-Type" : "application/json",
		"Opc-Apim-Subscription-Key" : ""
	}
}).then((result)=>{
	// this return a json object
	console.log(result.data)
	// 
	console.log(JSON.stringify(result.data))
})
