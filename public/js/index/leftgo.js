
define(['jquery'], function($){
	var left_pannel = $('#left_pannel');
	var left_pannel_go = $('#left_pannel_go');
	var map = $('#map');
	var TIME = 266;
	
	
	left_pannel_go.toggle(
		function(){
			left_pannel_go.empty();
			left_pannel_go.append('+');
			left_pannel.animate({width: 'toggle'}, TIME);
			left_pannel_go.animate({left: '50px'}, TIME);
			map.animate({left: '50px'}, TIME);
		},
		function(){
			left_pannel_go.empty();
			left_pannel_go.append('<div class="home_left_del"></div>');
			left_pannel.animate({width:'toggle'}, TIME);
			left_pannel_go.animate({left:'352px'}, TIME);
			map.animate({left:'352px'}, TIME);
		}
	);
});
