
define(['jquery', 'js/common/cookie'], function($, cookie){
	var email = $('#email');
	var password = $('#password');
	var code  = $('#code');
	var error_tips = $('.show_error_tip');
	
	$('.login_btn').on('click', function(e){
		error_tips.fadeOut('slow');
		if(!email.val() || !password.val() || !code.val()){
			error_tips.fadeIn('slow');
			return error_tips.text('请输入邮箱、密码、验证码');
		}
		var obj = {
			email: email.val(),
			password: password.val(),
			code: code.val()
		};
		$.post('/login', obj, function(data){
			if(data.status === 1){
				location.href = '/';
				error_tips.fadeOut('slow');
				cookie.set('userid', data.userid);
			}else{
				error_tips.fadeIn('slow');
				error_tips.text(data.info);	
			}
		});
	});	
});
