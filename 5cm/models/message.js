var mongo = require('../utils/mongo'),
    location = require('../utils/location');

var Message = function(user, message){
	this.userid = user.email; //用户的唯一标识
	this.text = message.text; //必须
	this.realLoc = message.realLoc;
	this.msgLoc = message.msgLoc;
	this.view = message.view; //阅读权限'public','private','userid'
	this.pics = message.pic || [];
}

Message.collName = 'message';

Message.prototype.createMsg = function(callback){
	var msg = {
		'userid': this.userid,
		'text': this.text,
		'realLoc': this.realLoc,
		'msgLoc': this.msgLoc,
		'view': this.view,
		'pics': this.pics
	};

	mongo.open(function(error, db){
		if(error){
			return callback(error);
		}
		db.collection(Message.collName, function(error, collection){
			if(error){
				mongo.close();
				return callback(error);
			}
			collection.insert(msg, {w: 1}, function(error, result){
				mongo.close();
				if(error){
					return callback(error);
				}
				callback(null, result[0]);
			});
		});
	});
}

//根据位置获取瓶子
Message.getMsgByLoc = function(loc, callback){
	mongo.open(function(error, db){
		if(error){
			return callback(error);
		}
		db.collection(Message.collName, function(error, collection){
			if(error){
				mongo.close();
				return callback(error);
			}
			collection.find({ "msgLoc" : { $gt: loc-0.065, $lt: loc+0.065 }}, function(error, items){
				mongo.close();
				if(error){
					return callback(error);
				}
				callback(null, items);
			});
		});
	});
}

//根据用户获取瓶子
Message.getMsgByUser = function(userid, callback){
	mongo.open(function(error, db){
		if(error){
			return callback(error);
		}
		db.collection(Message.collName, function(error, collection){
			if(error){
				mongo.close();
				return callback(error);
			}
			collection.find({userid: userid}, function(error, items){
				mongo.close();
				if(error){
					return callback(error);
				}
				callback(null, items);
			});
		});
	});
}

module.exports = Message;
