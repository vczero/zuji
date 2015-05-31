

require.config({
    paths: {
        jquery: '../../libs/jquery1.7',
        uploader: '../../libs/webuploader',
        underscore: '../../libs/underscore-min'
    }
});
 
require([
		'jquery',
		'js/common/leftgo',
		'js/common/header',
		'js/common/mapInit', 
		'js/index/login',
		'js/index/register',
		'js/index/verifycode',
		'js/common/searchinput',
		'js/index/show',
		'js/index/right'
], function($) {
	
	var ucnter_get_detail = $('.ucnter_get_detail');
	console.log(ucnter_get_detail);
	$('.right').css('display', 'block');
	ucnter_get_detail.on('click', function(){
		$('.right').css('display', 'block');
		$('.middle').css('right', '370px');
	});
   	
});