

define(['jquery'], function($){
	var email = $('#email');
	var password = $('#password');
	var code  = $('#code');
	var error_tips = $('.show_error_tip');
	
	$('.register_btn').on('click', function(e){
		error_tips.fadeOut();
		if(!email.val() || !password.val() || !code.val()){
			error_tips.fadeIn();
			return error_tips.text('请输邮箱、密码、验证码');
		}
		var obj = {
			email: email.val(),
			password: password.val(),
			code: code.val()
		};
		$.post('/register', obj, function(data){
			if(data.status === 1){
				cookie.set('userid', data.userid);
			}else{
				error_tips.fadeIn();
				error_tips.text(data.info);	
			}
		});
	});
	
});
