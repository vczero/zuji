var crypto = require('crypto');
var Mcrypto = {};

/*
	创建随机密码
*/
Mcryto.createPassword = function(){
	var pswAdd = ['5cm', 'xsnh', 'sdsd5', '9sj', 'o9hgg' , 'ch5cm'];
	var n = Math.round(Math.random()*6) - 1;
	var newPsw = Math.random()*10 + pswAdd[n] + Math.random()*10 +pswAdd[n]
				+ (Math.random()*10) * (Math.random()*10);
	return newPsw.toString();
};


/*
	对密码进行md5加密
*/
Mcryto.md5Password = function(password){
	var md5 = crypto.createHash('md5');
	var newPsw = md5.update(password + '@-5cm-youme').digest('hex');
	return newPsw;
};

module.exports = Mcryto;