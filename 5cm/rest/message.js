var Message = require('../models/message'),
    Code = require('../utils/code');

var MessageRest = {};
//创建一个短消息故事
MessageRest.create = function(req, res){
	var body = req.body,
	    msg = {
			'userid': body.userid,
			'text': body.text,
			'realLoc': body.realLoc,
			'msgLoc': body.msgLoc,
			'view': body.view,
			'pics': body.pics,
			'comments': body.comments
	    },
	    M = new Message(msg);

	M.createMsg(function(err, msg){
		if(err){
			msg.code = Code.fail;
			return res.send(msg);
		}
		res.send(msg);
	});
};

//获取某个人的短消息故事
MessageRest.getMsgByUser = function(req, res){
	var userid = req.params.userid;
	Message.getMsgByUser(userid, function(err, items){
		if(err){
			return res.send({});
		}
		res.send(items);
	});

};


module.exports = MessageRest;