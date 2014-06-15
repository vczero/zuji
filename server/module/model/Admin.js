//管理员模型
var Admin = function (option){
	this.nickname = option.nickname;//昵称
	this.password = option.password;//密码，MD5加密
	this.userid = '';//自动生成
}


//Admin原型方法
Admin.prototype = {
	setNickname: function(nickname){
		this.nickname = nickname;
	},

	setPassword: function(password){
		this.password = password;
	},

	getNickname: function(){
		return this.nickname;
	}
};