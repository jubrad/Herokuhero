
module.exports = function(app) {
	var ObjectId = require('mongodb').ObjectID;

	var Model = { name: 'IpModel' },
		collection = app.db.collection('ips');
		collection.ensureIndex( { "ip": 1 }, { unique: true },function(error){
			if(error){
				console.log(Model.name + " ensure uniqueness error...maybe it's alreayd indexed");
			}
			else{
				console.log('uniquness for ip gaurunteed');
			}
		});
// saves the ip address handed to it
	Model.save = function(ip){
		try{
			collection.save(ip,function(error){
				if(error){
					console.log(Model.name + '#list error saving your ip');
					// callback(app.config.errors.databse_error);
				}else{
					console.log("saved " + ip["ip"])
					// callback(null);
				}

			});
		}
		catch(exception){
				console.log(Model.name + ' #list exception when performing save')
			   console.log(exception);
		}
	}

// does a find opperation on a hashed query passed to it

		Model.list = function(query, callback) {
		try {
			collection.find(query).toArray(function(error, ips) {
			if(error) {
				console.log(Model.name + ' #list error when performing find ' + error.toString());
				callback(app.config.errors.database_error);
			} else {
				callback(null, ips);
			}
			});
		} catch(exception) {
			console.log(Model.name + ' #list exception when performing find ' + exception);
			callback(app.config.errors.database_error);
		}  
	};

	return Model;
}
