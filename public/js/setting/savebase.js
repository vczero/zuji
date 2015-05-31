

define(['jquery', 'js/common/cookie'], function($, cookie){
	
	//基础信息修改
	var base = $('#save_base');
	base.on('click', function(){
		var opts = {
			userid: cookie.get('userid'),
			username: $('#username').val(),
			weibo: $('#weibo').val(),
			weixin: $('#weixin').val(),
			sign1: $('#sign1').val(),
			sign2: $('#sign2').val(),
		};
		$.post('/updateBase', opts, function(data){
			if(data.status){
				location.reload();
			}
		});
	});
	
	//删除微信二维码
	var weixin = $('#delete_weixin');
	weixin.on('click', function(){
		$.post('/weixin/delete', function(data){
			if(data.status){
				location.reload();
			}
		});
	});
	
	
});
