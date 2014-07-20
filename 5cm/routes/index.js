/*
	主页相关功能
*/
var index = {};

index.index = function(req, res){
	res.render('index', {
		title: '秒速5厘米',
		user: null
	});
};

index.userinfo = function(req, res){
	res.render('list_login', {
		title: '用户信息',
		user: null
	});
};


index.bottle = function(req, res){
	res.render('list_bottle', {
		title: '瓶子',
		user: null
	});
};

index.find = function(req, res){
	res.render('list_find', {
		title: '找寻',
		user: null
	});
};


index.story = function(req, res){
	res.render('list_story', {
		title: '故事',
		user: null
	});
};


index.trail = function(req, res){
	res.render('list_trail', {
		title: '轨迹',
		user: null
	});
};


index.fivecm = function(req, res){
	res.render('list_5cm', {
		title: '关于5cm',
		user: null
	});
};



index.about = function(req, res){
	res.render('list_about', {
		title: '关于',
		user: null
	});
};

module.exports = index;


















