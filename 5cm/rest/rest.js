var user = require('./user');
var verifycode = require('./verifycode');


module.exports = function(app){
	app.post('/user/create', user.create); //注册接口中包含验证码功能的实例（单例）
	app.post('/user/get', user.get);
	app.get('/verifycode/create', verifycode);
	app.get('/message/create');
};