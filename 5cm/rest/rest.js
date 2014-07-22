var UserRest = require('./userRest');


module.exports = function(app){
	app.post('/user/create', UserRest.create); //注册接口中包含验证码功能的实例（单例）
	app.post('/user/get', UserRest.get);
};