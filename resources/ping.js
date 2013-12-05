
module.exports = function(app) {
	var Resource = { name: 'PingResource' }
	var sleeper = require('sleep');
	//accessing the model
	var IpModel = app.models.IpModel;
	//this program will fire every 5 minutes
	var minutesToWait = 1;




//http requirement to send get request
var http = require('http');



console.log('pinging loop has been called')

/*
	This function sends the ip address.  
	I found it on stack overflow it may need to be replaced
*/
	function httpGet(ip){
		var options = {
		  host: ip
		};

		http.get(options, function(res) {
		  console.log('STATUS: ' + res.statusCode);
		  // console.log('ERROR: ' + res.message);
		}).on('error', function(e) {
  				console.log('ERROR: ' + e.message);
		 	});
	}


/*
	Magic happens here.
	setInterval acts as a non blocking
	scheduler that runs through my ips and calls httpGet
	with a setTimeout on it so that it is both 
	non blocking and only pings for .6 seconds --this time may need to be decreased
*/
	Resource.pingLoop = setInterval(function() {
		console.log('searching for ips to ping...')
		IpModel.list({}, function(error, ips){
	        if(error)
	        {
	        	console.log('there was an error generating the list of ips')
	        }
	        else
	        {
	        	for(i=0;i<ips.length;i++){
	        		var ip=ips[i]['ip']
	        		console.log('sending get request to ' + ip);
	        		setTimeout(httpGet(ip),600);
	        	}
	        }
		});
	},minutesToWait * 1000*60);
/*
	because it only seems right to call this a resource
*/
	return Resource;
}

