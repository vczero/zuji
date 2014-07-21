var UserRest = require('./userRest');


module.exports = function(app){
	app.post('/user/create', UserRest.create); //暂时不能暴露因为没有短信获取验证码
	app.post('/user/get', UserRest.get);
};