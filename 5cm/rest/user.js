var User = require('../models/user');
var Mcrypto = require('../utils/mcrypto');
var Code = require('../utils/code');


var userRest = {};
/*
	获取用户信息，判断用户是否可以登录
*/
userRest.get = function(req, res){
	var username = req.body.username,
	    password = Mcrypto.md5Password(req.body.password),
	    userinfo = {
			code: 0,
			user: {}
		};

	User.getUser(username, function(err, user){
		//不存在的用户名
		if(!user){
			userinfo.code = Code.user_not_find;
			return res.send(userinfo);
		}
		//密码错误
		if(user.password !== password){
			userinfo.code = Code.psw_err;
			return res.send(userinfo);
		}
		//成功
		req.session.user = user;
		userinfo.code = Code.success;
		userinfo.user = user;
		res.send(userinfo);
	});
}


userRest.create = function(req, res){
	var body = req.body,
	    username = req.body.username,
	    password = req.body.password,
	    email = req.body.email,
	    password_re = req.body.password_re,
	    registerInfo = {
			code: 0,
			name:''
		};
	if(password !== password_re){
		registerInfo.code = Code.psw_re_err;
		return res.send(registerInfo);
	}
	var newUser = new User({
		name: username,
		password: Mcrypto.md5Password(password),
		email: email
	});
	User.getUser(newUser.name, function(err, user){
		//出错
		if(err){
			registerInfo.code = Code.fail;
			return res.send(registerInfo);
		}
		//用户已经存在
		if(user){
			registerInfo.code = Code.user_exist;
			return res.send(registerInfo);
		}
		//创建用户
		newUser.createUser(function(err, user){
			if(err){
				return res.send(registerInfo);
			}
			req.session.user = user;
			registerInfo.code = Code.success;
			registerInfo.name = user.name;
			res.send(registerInfo);
		});
	});
}

module.exports = userRest;
