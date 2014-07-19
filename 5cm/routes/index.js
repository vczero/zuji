/*
	主页相关功能
*/
var index = {};

index.index = function(req, res){
	res.render('index', {
		title: '王利华'
	});
};


module.exports = index;


















