
//用户间的消息沟通
var Message = function(option){
	this.sender = ''; //发件人ID
	this.recipients = '';//收件人ID
	this.message = '';//发送内容
	this.date = new Date(); //发送时间

	if(option){
		this.sender = option.sender;
		this.recipients = option.recipients;
		this.message = option.message;
	}
}

Message.prototype = {
	
};