

var userEngine = require('../engine/userEngine');
var request = require('request');
var img = require('../utils/image');

module.exports = {
	
	init: function(app){
		app.post('/login', this.login);
		app.post('/logout', this.logout);
		app.get('/register', this.register);
		app.post('/modify', this.modify);
		app.post('/update', this.update);
	},
	
	login: function(req, res){
		
	},
	logout: function(req, res){
		
	},
	register: function(req, res){
		var username = req.param('username');
		var password = req.param('password');
		var code = req.param('code');
		var err = {status: 0};
		if(!username || !password || !code){
			err.info = '用户名或者密码或者验证码不能为空';
			return res.send(err);
		}
		if(!req.session.verifycode){
			err.info = '禁止非法，禁止强暴的方式注册';
			return res.send(err);
		}
		if(code.toLowerCase() !== (req.session.verifycode).toLowerCase()){
			err.info = '验证码错误';
			return res.send(err);
		}
		
		/*更新验证码*/
		req.session.verifycode = img.verifyCode().text;
		
		
		
		return res.send((req.session.verifycode).toLowerCase());
		
	},
	modify: function(req, res){
		
	},
	update: function(req, res){
		
	}
};

