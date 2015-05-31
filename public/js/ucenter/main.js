

require.config({
    paths: {
        jquery: '../../libs/jquery1.7',
        uploader: '../../libs/webuploader'
    }
});
 
require([
	'js/common/searchinput', 
	'js/ucenter/gendate', 
	'js/ucenter/post', 
	'js/common/leftgo', 
	'js/common/header',
	'js/ucenter/show',
	'js/ucenter/getdetail'
	], function(story, leftgo) {
   	
});