/**
 * 用户模型的数据库层面CRUD,不涉及业务层面,不做字符校验,不做加密
 * 所有的校验、加密放到逻辑中；delete密码，delete邮箱
 * @author: 王利华
 * @time: 2015-5-7
 * @email: lh_wang@ctrip.com
 * */

var toObjectID = require('mongoskin').helper.toObjectID;
var uuid = require('node-uuid');
var mongo = require('../utils/mongo');
var extend = require('../utils/extend');
var User = require('../models/userModel').User;
var db = mongo.guiderDB();
var TABLE_NAME = 'user';

db.bind(TABLE_NAME);

module.exports = {
	
	/* 创建用户
	 * @username:必须
	 * @password：必须
	 * @type:必须，默认是USER_TYPE.OTHER
	 * */
	create: function(username, password, type, callback){
		var user = extend(User);
		user.user_id = (new Date().valueOf()) + '-' + uuid.v4();
		user.user_name = username;
		user.password = password;
		user.user_type = type;
		user.create_time = new Date();
		
		db[TABLE_NAME].save(user, callback);
	},
	
	/* 修改用户信息
	 * @userid:必须，当前用户
	 * @opts: 必须，修改的对象
	 * */
	update: function(userid, opts, callback){
		db[TABLE_NAME].findOne({user_id: userid}, function(err, item){
			if(!err){
				//do...
			}else{
				callback('error', null);
			}
		});
	},
	
	/* 根据用户名查询用户
	 * @username:必须 
	 * */
	getUserByName: function(username, callback){
		//后期设定分页
		db[TABLE_NAME].find({user_name: username}).limit(10).toArray(callback);
	},
	
	/*根据用户类型查询用户*/
	getUserByType: function(usertype, callback){
		//后期设定分页
		db[TABLE_NAME].find({user_type: usertype}).limit(10).toArray(callback);
	},
	
	
};
