

var toObjectID = require('mongoskin').helper.toObjectID;
var uuid = require('node-uuid');
var mongo = require('../utils/mongo');
var extend = require('../utils/extend');
var User = require('../models/userModel').User;
var db = mongo.getDB();
var TABLE_NAME = 'user';

db.bind(TABLE_NAME);

module.exports = {
	
	//创建用户
	create: function(email, password, callback){
		var user = extend(User);
		user.userid = (new Date().valueOf()) + '-' + uuid.v4();
		user.email = email;
		user.password = password;
		user.createtime = new Date();
		
		db[TABLE_NAME].save(user, function(err, data){
			callback(err, user);
		});
	},
	
	//更新用户
	update: function(userid, opts, callback){
		db[TABLE_NAME].update(
			{userid: userid},
			{$set: opts},
			function(err, item){
				callback(err, item);
			}
		);
	},
	
	//通过邮箱查找用户
	getUserByEmail: function(email, callback){
		db[TABLE_NAME].find({email: email}).limit(10).toArray(callback);
	},
	
	//通过邮箱密码查询用户
	getUserByEmailPassord: function(email, password, callback){
		var opts = {
			email: email,
			password: password
		};
		db[TABLE_NAME].find(opts).limit(10).toArray(callback);
	},
	
	getUserByUserID: function(userid, callback){
		db[TABLE_NAME].find({userid: userid}).limit(1).toArray(callback);
	}
	
};
