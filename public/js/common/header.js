
define(['jquery'], function($){
	var list = $('.header>div');
	
	list.on('mouseenter', function(e){
		var target = $(this).find('a div');
		target.css('display', 'block');
		target.animate({
			width: '100px'
		});
	});
	
	list.on('mouseleave', function(e){
		var target = $(this).find('a div');
		target.css('display', 'none');
		target.animate({
			width: '0'
		})
	});
});
