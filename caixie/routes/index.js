
/*
 * GET home page.
 */

var crypto = require('crypto'),
	User = require('../models/user.js');

/*
	req.query:处理get请求，获取请求参数
	req.params:获取/:xx的get或者post请求
	req.body:处理post请求
	req.param():处理get或者post请求
*/

module.exports = function(app){
	var success = '';
	var error = '';
	app.get('/', function(req, res){
		res.render('index', { 
			title: '主页' ,
			user: req.session.user,
			success: success.toString(),
			error: error.toString()
		});
	})

	app.get('/reg', function(req, res){
		res.render('reg', { 
			title: '注册' ,
			user: req.session.user,
			success: success.toString(),
			error: error.toString()
		});
	});

	app.post('/reg', function(req, res){
		var name = req.body.username;
		var password = req.body.password;
		var passwordRepeat = req.body.password_repeat;

		if(password !== passwordRepeat){
			console.log('两次输入的密码不一致');
			error = '两次输入的密码不一致';
			return res.redirect('/reg'); //定向回注册页面
		}

		var md5 = crypto.createHash('md5');
		password = md5.update(req.body.password).digest('hex');
		var newUser = new User({
			name: req.body.username,
			password: password,
			email: req.body.email
		});

		User.get(newUser.name, function(err, user){

			if(user){
				console.log('用户已存在');
				error = '用户已存在';
				return res.redirect('/reg');
			}

			newUser.save(function(err, user){
				if(err){
					console.log('服务出错');
					error = err.toString();
					return res.redirect('/reg');
				}
				req.session.user = user;//用户信息放入session
				success = '注册成功';
				console.log('注册成功');
				res.redirect('/');//定向回首页
			});

		});
	});

	app.get('/login', function(req, res){
		res.render('login', { 
			title: '登录',
			user: req.session.user,
			success: success.toString(),
			error: error.toString()
		});
	});

	app.post('/login', function(req, res){
		var md5 = crypto.createHash('md5');
		var password = md5.update(req.body.password).digest('hex');

		User.get(req.body.username, function(err, user){
			if(!user){
				error = '用户不存在';
				return res.redirect('/login');
			}

			if(user.password !== password){
				error = '密码错误';
				return res.redirect('/login');
			}

			req.session.user = user;
			success = '登录成功';
			res.redirect('/');
		});

	});

	app.get('/post', function(req, res){
		res.render('post', { title: '发表'});
	});

	app.post('/post', function(req,res){});

	app.get('/logout', function(req ,res){
		req.session.user = '';
		success = '退出成功！';
		console.log('退出成功,跳到主页');
		res.redirect('/');
	});

	app.get('/show', function(req,res){
		res.send('hello world!');
	})

};