

define(['jquery'], function(){
	var code = $('#verifycode');
	code.on('click', function(e){
		var num = Math.random();
		var time = new Date().valueOf();	
		code[0].src = '/verifycode?timestamp=' + num + time;
	});
	
});
