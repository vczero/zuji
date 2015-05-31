

define(['jquery'], function($){
	var mask = $('<div id="___wlh_mask" style="z-index:9998;background-color:#000;"></div>');
	mask.css('opacity', 0.6);
	mask.css('position', 'absolute');
	mask.css('top', '0');
	mask.css('left', '0');
	mask.css('right', '0');
	mask.css('bottom', '0');
	
	return {
		show: function(){
			$('body').append(mask);
		},
		hide: function(){
			mask.remove();
		}
	};
});
