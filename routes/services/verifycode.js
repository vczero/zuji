
var img = require('../utils/image');


module.exports = {
	init: function(app){
		app.get('/verifycode', this.verifyCode);
	},
	
	verifyCode: function(req, res){
		var code = img.verifyCode();
		req.session.verifycode = code.text;
		return res.end(code.buffer);
	}
};
