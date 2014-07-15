
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
	app.get('/', function(req, res){
		res.render('index', { title: '主页' });
	})

	app.get('/reg', function(req, res){
		res.render('reg', { title: '注册' });
	});

	app.post('/reg', function(req, res){
		
		var name = req.body.username;
		var password = req.body.password;
		var passwordRepeat = req.body.password_repeat;

		if(password !== passwordRepeat){
			req.flash('error', '两次输入的密码不一致，请重新输入。');
			return res.redirect('/reg'); //定向回注册页面
		}

		var md5 = crypto.createHash('md5');
		password = md5.update(req.body.password).digest('hex');

		var newUser = new User({
			name: req.body.username,
			password: req.body.password,
			email: req.body.email
		});

		User.get(newUser.name, function(err, user){
			if(user){
				req.flash('error', '用户已存在');
				return res.redirect('/reg');
			}

			newUser.save(function(err, user){
				if(err){
					req.flash('error', err);
					return res.redirect('/reg');
				}

				req.session.user = user;//用户信息放入session
				// req.flash('success', '注册成功');
				res.redirect('/');//定向回首页
			});
		});
	});

	app.get('/login', function(req, res){
		res.render('login', { title: '登录'});
	});

	app.post('/login', function(req, res){});

	app.get('/post', function(req, res){
		res.render('post', { title: '发表'});
	});

	app.post('/post', function(req,res){});

	app.post('/logout', function(req ,res){});

	app.get('/show', function(req,res){
		res.send('hello world!');
	})

};