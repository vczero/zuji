

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
		'js/index/detail'
], function($) {
	
});