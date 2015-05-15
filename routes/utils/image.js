

var http = require('http');
var ccap = require('ccap');


module.exports = {
	verifyCode: function(){
		var captcha = ccap({
			width: 180,
			height: 40,
			fontsize: 30,
			quality: 80,
			offset: 25
		});
		var arr = captcha.get();
    		var txt = arr[0];
    		var buf = arr[1];
    		
    		return {
    			text: txt,
    			buffer: buf
    		}
	}
};
