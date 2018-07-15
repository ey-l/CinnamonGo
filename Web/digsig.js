
var SignedXml = require('xml-crypto').SignedXml	  
	  , fs = require('fs')

var xml = "<CinnamonGo>" +
	      "<carname> CinnamonGoCar </carname>" +
	      "<username>Harry Potter</username>" +
	      "<userbalance>900</userbalance>" +
	      "</CinnamonGo>"

var sig = new SignedXml()
sig.addReference("//*[local-name(.)='carname']")    
sig.signingKey = fs.readFileSync("key.pem")
sig.computeSignature(xml)
fs.writeFileSync("signed.xml", sig.getSignedXml())
