

define(['jquery'], function($){
	var left_pannel = $('#left_pannel');
	var body = $('body');
	
	body.on('click', function(e){
		if($(e.target).hasClass('ucnter_get_detail')){
			left_pannel.empty();
		}
	});
	
});
