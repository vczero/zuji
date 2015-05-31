

define(['jquery', 'js/common/mapInit'], function($, map){
	var search_input = $('#search_input');
	var search_btn = $('#search_btn');
	
	search_btn.on('click', function(){
		var text = search_input.val();
		map.setCity(text);
	});
	
	search_input.on('keypress', function(e){
		if(e.keyCode === 13){
			var text = search_input.val();
			map.setCity(text);
		}
	});
	
});
