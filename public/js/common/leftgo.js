
define(['jquery'], function($){
	var left_pannel = $('#left_pannel');
	var left_pannel_go = $('#left_pannel_go');
	var middle = $('.middle');
	var TIME = 266;
	
	//左侧栏的显示隐藏
	left_pannel_go.toggle(
		function(){
			left_pannel_go.empty();
			left_pannel_go.append('+');
			left_pannel.animate({width: 'toggle'}, TIME);
			left_pannel_go.animate({left: '55px'}, TIME);
			middle.animate({left: '55px'}, TIME);
		},
		function(){
			left_pannel_go.empty();
			left_pannel_go.append('<div class="home_left_del"></div>');
			left_pannel.animate({width:'toggle'}, TIME);
			left_pannel_go.animate({left:'355px'}, TIME);
			middle.animate({left:'356px'}, TIME);
		}
	);
	
	
	//微信图片账号的显示隐藏
	var weixin = $('.weixin');
	var parent = null;
	weixin[0] && (parent = $(weixin[0].parentNode));
	if(parent){
		var weixin_img = $('.weixin_img');
		parent.on('mouseover', function(){
			weixin_img.css('display', 'block');
		});
		
		parent.on('mouseout', function(){
			weixin_img.css('display', 'none');
		});	
	}
	
});
