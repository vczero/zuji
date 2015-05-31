
define(['jquery', 'underscore', 'js/common/mask'], function($, _, mask){
	var el = $('#left_tpl_div');
    var tpl = $('#left_tpl').html();
 
    var data = {
    		username: '大白',
    		avatar: '/imgs/avatar.png',
    		time: '2015-05-24',
    		weibo: 'http://vczero.weibo.com',
    		liulan: '300',
    		content: '人人都有弱点，不能成大事的人总是固守着自己的弱点，一生很难有转变。而一个能成大事的人总会寻找自己的弱点，从自己的弱点上开刀。冲破弱点，一个连自己的缺陷都不能纠正的人，只能当失败者',
		comments:[
			{
				avatar: '/imgs/avatar.png',
				content: '人人都有弱点，不能成大事的人总是固守着自己的弱点，一生很难有转变。',
				time: '2015-05-24'
			},
			{
				avatar: '/imgs/avatar.png',
				content: '人人都有弱点，不能成大事的人总是固守着自己的弱点，一生很难有转变。',
				time: '2015-05-24'
			},
			{
				avatar: '/imgs/avatar.png',
				content: '人人都有弱点，不能成大事的人总是固守着自己的弱点，一生很难有转变。',
				time: '2015-05-24'
			},
			{
				avatar: '/imgs/avatar.png',
				content: '人人都有弱点，不能成大事的人总是固守着自己的弱点，一生很难有转变。',
				time: '2015-05-24'
			},
			{
				avatar: '/imgs/avatar.png',
				content: '人人都有弱点，不能成大事的人总是固守着自己的弱点，一生很难有转变。',
				time: '2015-05-24'
			},
			{
				avatar: '/imgs/avatar.png',
				content: '人人都有弱点，不能成大事的人总是固守着自己的弱点，一生很难有转变。',
				time: '2015-05-24'
			},
			{
				avatar: '/imgs/avatar.png',
				content: '人人都有弱点，不能成大事的人总是固守着自己的弱点，一生很难有转变。',
				time: '2015-05-24'
			},
			{
				avatar: '/imgs/avatar.png',
				content: '人人都有弱点，不能成大事的人总是固守着自己的弱点，一生很难有转变。',
				time: '2015-05-24'
			},
			{
				avatar: '/imgs/avatar.png',
				content: '人人都有弱点，不能成大事的人总是固守着自己的弱点，一生很难有转变。',
				time: '2015-05-24'
			},
			{
				avatar: '/imgs/avatar.png',
				content: '人人都有弱点，不能成大事的人总是固守着自己的弱点，一生很难有转变。',
				time: '2015-05-24'
			},
			{
				avatar: '/imgs/avatar.png',
				content: '人人都有弱点，不能成大事的人总是固守着自己的弱点，一生很难有转变。',
				time: '2015-05-24'
			},
			{
				avatar: '/imgs/avatar.png',
				content: '人人都有弱点，不能成大事的人总是固守着自己的弱点，一生很难有转变。',
				time: '2015-05-24'
			},
			{
				avatar: '/imgs/avatar.png',
				content: '人人都有弱点，不能成大事的人总是固守着自己的弱点，一生很难有转变。',
				time: '2015-05-24'
			},
			{
				avatar: '/imgs/avatar.png',
				content: '人人都有弱点，不能成大事的人总是固守着自己的弱点，一生很难有转变。',
				time: '2015-05-24'
			},
			{
				avatar: '/imgs/avatar.png',
				content: '人人都有弱点，不能成大事的人总是固守着自己的弱点，一生很难有转变。',
				time: '2015-05-24'
			}
			
		]
    };
 	
 	var render = _.template(tpl);
    var html = render(data);
    el.html(html);
    
    $('body').on('click', function(e){
    		e = e || event;
    		var _el = $(e.target || e.srcElement);
    		if(_el.hasClass('ucnter_get_detail')){
    			mask.show();
    			$('.story').css('display', 'block');
    		}
    		
    });
    
});
