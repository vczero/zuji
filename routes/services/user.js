
var request = require('request');
var async = require('async');
var crypto = require('crypto');
var userEngine = require('../engine/userEngine');
var img = require('../utils/image');

module.exports = {
	
	init: function(app){
		app.post('/login', this.login);
		app.post('/logout', this.logout);
		app.post('/register', this.register);
		app.post('/updateBase', this.updateBaseInfo);
		app.post('/weixin/delete', this.deleteWeixin);
		
		app.get('/user/get', this.getUserByUserid);
	},
	//登录
	login: function(req, res){
		var email = req.param('email');
		var password = req.param('password');
		var code = req.param('code');
		var status = {status: 2};
		
		async.waterfall([
			function(callback){
				checkParams(status, email, password, code , req, res, function(){
					callback(null);
				});
			},
			function(callback){
				password = md5(password);
				userEngine.getUserByEmailPassord(email, password, function(err, results){
					if(!err && (results.length === 0)){
						status.status = STATUS_CODE.noUser;
						status.info = '用户名或者密码错误';
						return res.send(status);
					}else{
						delete results[0].password;
						results[0].status = 1;
						req.session.user = results[0];
						return res.send(results[0]);
					}
				});
			}
		]);
	},
	
	//登出
	logout: function(req, res){
		req.session.user = null;
		return res.send({
			status: 1
		});
	},
	
	//注册
	register: function(req, res){
		var email = req.param('email');
		var password = req.param('password');
		var code = req.param('code');
		var status = {status: 2};
		
		async.waterfall([
			//(0)先校验参数
			function(callback){
				checkParams(status, email, password, code , req, res, function(){
					callback(null);
				});
			},
			//(1)先查询是否存在email
			function(callback){
				userEngine.getUserByEmail(email, function(err, results){
					if(!err && (results.length === 0)){
						callback(null);
					}else{
						status.status = STATUS_CODE.emailHas;
						status.info = '邮箱已经存在';
						return res.send(status);
					}
				});
			},
			//(2)加密密码
			function(callback){
        			password = md5(password);
        			callback(null);
			},
			//(3)写入数据库
			function(){
				userEngine.create(email, password, function(err, item){
					if(!err){
						status.status = STATUS_CODE.success;
						status.info = '注册成功';
						//(4)更新验证码
						req.session.verifycode = img.verifyCode().text;
						delete item.password;
						delete item._id;
						req.session.user = item;
						return res.send(status);
					}else{
						status.status = STATUS_CODE.serverError;
						status.info = '服务出现异常，请稍后再试';
						return res.send(status);
					}
				});
			}
		]);
		
	},
	
	//更新用户基本信息
	updateBaseInfo: function(req, res){
		var username = req.param('username');
		var weibo = req.param('weibo');
		var weixin = req.param('weixin');
		var sign1 = req.param('sign1') || '';
		var sign2 = req.param('sign2') || '';
		
		
		if(!req.session.user || !req.session.user.userid){
			return res.send({
				status: 0,
				info: '非法操作'
			});
		}
		
		var sign = [];
		var userid = req.session.user.userid;
		sign.push(sign1);
		sign.push(sign2);
		var opts = {
			username: username,
			weibo: weibo,
			weixin: weixin,
			sign: sign
		};
		
		userEngine.update(userid, opts, function(err, data){
			if(err){
				return res.send({
					status: 0
				});
			}else{
				req.session.user = {
					userid: userid,
					username: username,
					email: req.session.user.email,
					weibo: weibo,
					weixin: weixin,
					weixin_pic: req.session.user.weixin_pic,
					sign: sign
				};
				return res.send({
					status: 1
				});
			}
		});
	},
	
	//删除二维码地址
	deleteWeixin: function(req, res){
		if(!req.session.user || !req.session.user.userid){
			return res.send({
				status: 0
			});
		}
		var userid = req.session.user.userid;
		//请空微信地址
		userEngine.update(userid, {weixin_pic: ''}, function(err, data){
			if(err){
				return res.send({
					status: 0
				});
			}else{
				req.session.user = {
					userid: userid,
					username: req.session.user.username,
					email: req.session.user.email,
					weibo: req.session.user.weibo,
					weixin: req.session.user.weixin,
					weixin_pic: '',
					sign: req.session.user.sign
				};
				return res.send({
					status: 1
				});
			}
		});
	},
	
	getUserByUserid: function(req, res){
		var userid = req.param('userid');
		if(!userid){
			return res.send({
				status: 0
			});
		}
		userEngine.getUserByUserID(userid, function(err, items){
			if(!err && items.length){
				items[0].status = 1;
				return res.send(items[0]);
			}else{
				return res.send({
					status: 0
				}); 
			}
		});
	}
};

/* 状态码 */
var STATUS_CODE = {
	success: 1,
	emailEmpty: 2,
	invild: 3,
	codeError: 4,
	emailHas: 5,
	serverError: 6,
	noUser: 7
};


/*
 * 校验用户参数
 * @status:返回状态
 * @email:邮箱
 * @password:密码
 * @code:验证码
 * @req:请求
 * @res:响应
 * @callback:回调
 * */
function checkParams(status, email, password, code , req, res, callback){
	if(!email || !password || !code){
		status.status = STATUS_CODE.emailEmpty;
		status.info = '邮箱或者密码或者验证码不能为空';
		return res.send(status);
	}
	if(!req.session.verifycode){
		status.status = STATUS_CODE.invild;
		status.info = '禁止非法，禁止强暴的方式注册';
		return res.send(status);
	}
	if(code.toLowerCase() !== (req.session.verifycode).toLowerCase()){
		status.status = STATUS_CODE.codeError;
		status.info = '验证码错误';
		return res.send(status);
	}
	callback(null);
}

/* 加密密码 */
function md5(password){
	var md5 = crypto.createHash('md5'),
	salt = '(!%$88hs**7dsndsgv*)#sassb9';
	password = md5.update(password + salt).digest('hex');
	return password;
}

