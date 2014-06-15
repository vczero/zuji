
//用户模型
var User = function(option){
	this.email = '';//邮件
	this.nickname = '';//昵称
	this.password = '';//密码，MD5加密
	this.userid = '';//自动生成
	this.date = new Date();//创建时间

	if(option){
		this.email = option.email || '';
		this.nickname = option.nickname || '';
		this.password = option.password || '';
	}
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
	},

	getDate: function(){
		return this.date;
	}
};