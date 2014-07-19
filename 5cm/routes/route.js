/*
	暴露路由接口
*/
var index = require('./index');


module.exports = function(app){
	app.get('/', index.index);

};
