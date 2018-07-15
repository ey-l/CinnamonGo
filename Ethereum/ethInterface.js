Web3 = require('web3');
web3 = new Web3(Web3.currentProvider);
//web3 = new Web3(new Web3.providers.HttpProvider("localhost:8545"));
fs = require('fs');
code = fs.readFileSync('cinnamongo.sol').toString();
solc = require('solc');
compiledCode = solc.compile(code);
abiDefinition = JSON.parse(compiledCode.contracts[':CinnamonGo'].interface);
Contract = web3.eth.contract(abiDefinition);
byteCode = compiledCode.contracts[':CinnamonGo'].bytecode;
deployedContract = Contract.new(undefined,{data: byteCode, from: web3.eth.accounts[0], gas: 4700000});
console.log(deployedContract.address);
contractInstance = Contract.at(deployedContract.address);