//管理员模型
var Admin = function (option){
	this.nickname = '';//昵称
	this.password = '';//密码，MD5加密
	this.userid = '';//自动生成
	this.date = new Date();//创建时间

	if(option){
		this.nickname = option.nickname || '';
		this.password = option.password || '';
	}
	
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
	},

	getDate: function(){
		return this.date;
	}
};