var user = require('./user');
var verifycode = require('./verifycode');


module.exports = function(app){
	app.post('/user/register', user.register); //注册接口中包含验证码功能的实例（单例）
	app.post('/user/login', user.login);
	app.get('/message/create');
};