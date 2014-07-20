/*
	暴露路由接口
*/
var index = require('./index');


module.exports = function(app){
	app.get('/', index.index);
	app.get('/userinfo', index.userinfo);
	app.get('/bottle', index.bottle);
	app.get('/find', index.find);
	app.get('/trail', index.trail);
	app.get('/story', index.story);
	app.get('/5cm', index.fivecm);
	app.get('/about', index.about);

};
