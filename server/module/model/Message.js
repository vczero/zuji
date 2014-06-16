
//用户间的消息沟通
var Message = function(option){
	this.mid = '';//自动生成的mid
	this.sender = ''; //发件人ID
	this.recipients = '';//收件人ID
	this.message = '';//发送内容
	this.date = new Date(); //发送时间

	if(option){
		this.sender = option.sender;
		this.recipients = option.recipients;
		this.message = option.message;
		this.mid = option.mid;
	}
}

Message.prototype = {
	setSender: function(sender){
		this.sender = sender;
	},

	setRecipients: function(recipients){
		this.recipients = recipients;
	},

	setMessage: function(message){
		this.message = message;
	},

	setMid: function(mid){
		this.mid = mid;
	},

	getSender: function(){
		return this.sender;
	},

	getRecipients: function(){
		return this.recipients;
	},

	getMessage: function(){
		return this.getMessage;
	},

	getMid: function(){
		return mid;
	}
	
};