

define(['jquery'], function($){
	
	window.alert = function(text, opts, hidetime){
		var str = '<div id="___wlh_alter" style="width:310px;height:150px;z-index:9999;background-color:#fff;">';
		str += '<div style="color:#1AB6FF;font-size:16px;margin-top:10px;margin-left:10px;line-height:25px;">提示</div>';
		str += '<div style="width:280px;border-top:1px solid #ccc;margin-left:5px;"></div>';
		str += '<div style="width:300px;height:60px;text-align:center;line-height:60px;font-size:15px;"> ' + text +'</div>';
		str += '<div id="___wlh_hide_alter" style="color:#1AB6FF;font-size:16px;margin-top:10px;margin-left:130px;cursor:pointer;">确定</div>'
		str += '</div>';
		
		var el = $(str);
		var mask = $('<div id="___wlh_mask" style="z-index:9998;background-color:#000;"></div>');
		
		el.css('border', '1px solid #ddd');
		el.css('borderRadius', '2px');
		el.css(opts);
		
		mask.css('opacity', 0.6);
		mask.css('position', 'absolute');
		mask.css('top', '0');
		mask.css('left', '0');
		mask.css('right', '0');
		mask.css('bottom', '0');
		
		$('body').append(el);
		$('body').append(mask);
		
		$('#___wlh_hide_alter').on('click', function(){
			el.remove();
			mask.remove();		
		});
		
		if(hidetime){
			setTimeout(function(){
				el.remove();
				mask.remove();
			}, hidetime);
		}
	};
	
	return window.alert;
});
