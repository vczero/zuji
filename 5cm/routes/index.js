/*
	主页相关功能
*/
var index = {};

index.index = function(req, res){
	res.render('index', {
		title: '秒速5厘米',
		user: req.session.user
	});
};

index.userinfo = function(req, res){
	res.render('list_login', {
		title: '用户信息',
		user: req.session.user
	});
};


index.bottle = function(req, res){
	res.render('list_bottle', {
		title: '瓶子',
		user: req.session.user
	});
};

index.find = function(req, res){
	res.render('list_find', {
		title: '找寻',
		user: req.session.user
	});
};


index.story = function(req, res){
	res.render('list_story', {
		title: '故事',
		user: req.session.user
	});
};


index.trail = function(req, res){
	res.render('list_trail', {
		title: '轨迹',
		user: req.session.user
	});
};


index.fivecm = function(req, res){
	res.render('list_5cm', {
		title: '关于5cm',
		user: req.session.user
	});
};



index.about = function(req, res){
	res.render('list_about', {
		title: '关于',
		user: req.session.user
	});
};

module.exports = index;


















