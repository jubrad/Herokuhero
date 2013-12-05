var express = require('express');
var app = module.exports = express();
var resource;
app.config = require('./config');
var http=require('http');

app.configure(function(){
    app.set('port',3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');

    app.use (express.logger("dev"));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});



/*
	database connection
*/
var MongoClient = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/ipdb', function (error, db) {
  if(error) {
    console.log("Error connecting to database: " + error.toString().replace("Error: ",""));
  } 
  else {
    console.log("Connected to DB " + 'mongodb://localhost:27017/ipdb');
    
    app.db = db;
    app.models = {
         IpModel : require('./lib/models/ip')(app)
    };

    app.controllers = {
        IpController : require('./lib/controllers/ips')(app)
	};    

      /*
      routes
    */
    routes = require('./routes')(app);

    /*
      starts the pinging service
    */
    resource =  require('./resources/ping')(app)
    resource.pingLoop;


    /*
      server
    */
  var port = process.env.PORT || 3000;

    app.listen(port, function(){
          console.log("Express server listening on port %d in %s mode", 3000, app.settings.env);
    });


  }
});



