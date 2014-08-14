var Message = require('../models/message'),
    Code = require('../utils/code');

var messageRest = {};
messageRest.create = function(req, res){
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
}

module.exports = messageRest;