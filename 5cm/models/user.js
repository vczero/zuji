var mongo = require('../utils/mongo'),
    mcrypto = require('../utils/mcrypto');

var User = function(user){
	this.name = user.name;
	this.password = user.password;
	this.email = user.email;
}

User.collName = 'user';

User.prototype.createUser = function(callback){
	var user = {
		name: this.name,
		password: this.password,
		email: this.email
	};
	mongo.open(function(error, db){
		if(error){
			return callback(error);
		}
		db.collection(User.collName, function(error, collection){
			if(error){
				mongo.close();
				return callback(error);
			}
			collection.insert(user, {w: 1}, function(error, result){
				mongo.close();
				if(error){
					return callback(error);
				}
				callback(null, result[0]);
			});
		});
	});
};


/*
  查询用户
*/
User.getUser = function(name, callback){
	mongo.open(function(error, db){
		if(error){
			return callback(error);
		}
		db.collection(User.collName, function(error, collection){
			if(error){
				mongo.close();
				return callback(error);
			}
			collection.findOne({name: name}, function(error, item){
				mongo.close();
				if(error){
					return callback(error);
				}
				callback(null, item);
			});
		});
	});
}

module.exports = User;