//管理的静态类
var crypto = require('crypto');

var AdManager = {};
//加密模块
AdManager.crypto = function(password){
	var md5 = crypto.createHash('md5');
	md5.update(password.toString(), 'utf8');
	var md5_password = md5.digest('hex');
	return md5_password;
}

//生成关于用户的唯一ID
AdManager.createId = function(objectid, id){
	var str = objectid['$oid'];
	return str + '_caixie_' + id;
}

module.exports = AdManager;


