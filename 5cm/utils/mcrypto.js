var crypto = require('crypto');
var Mcrypto = {};

/*
	创建随机密码
*/
Mcrypto.createPassword = function(){
	var pswAdd = ['5M', 'xH', 'D5', 'sJ', 'oH' , 'cM'];
	with(Math){
		var n = round(random()*6);
		n = n > 5 ? 5:n;
		var newPsw = round(random()*10) + pswAdd[n] + round(random()*10) 
					+ pswAdd[n] + round((random()*10) * (random()*10));
	}
	return newPsw;
};


/*
	对密码进行md5加密
*/
Mcrypto.md5Password = function(password){
	var md5 = crypto.createHash('md5');
	var newPsw = md5.update(password + '@-5cm-youme').digest('hex');
	return newPsw;
};

module.exports = Mcrypto;
