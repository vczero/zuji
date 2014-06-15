
//用户模型
var User = function(option){
	this.email = option.email;//邮件
	this.nickname = option.nickname;//昵称
	this.password = option.password;//密码，MD5加密
	this.userid = '';//自动生成
}


//User原型方法
User.prototype = {
	setEmail: function(email){
		this.email = email;
	},

	setNickname: function(nickname){
		this.nickname = nickname;
	},

	setPassword: function(password){
		this.password = password;
	},

	getEmail: function(){
		return this.email;
	},

	getNickname: function(){
		return this.nickname;
	}
};