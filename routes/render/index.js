
var userEngine = require('../engine/userEngine');

module.exports = {
	init: function(app){
		//全国信息
		app.get('/', this.index);
		app.get('/setting', this.setting);
		app.get('/login', this.login);
		app.get('/ucenter', this.ucenter);
	},
	
	
	index: function(req, res){
		return res.render('index/main', {
			title: '',
			user: req.session.user || ''
		});
	},
	
	setting: function(req, res){
		return res.render('setting/main', {
			title: '',
			user: req.session.user || ''
		});
	},
	
	login: function(req, res){
		return res.render('login/main', {
			title: '',
			user: req.session.user || ''
		});
	},
	
	ucenter: function(req, res){
		return res.render('ucenter/main', {
			title: '',
			user: req.session.user || ''
		});
	}
};
