
define(['jquery', 'underscore', 'js/common/mask'], function($, _, mask){
	var el = $('#left_tpl_div');
    var tpl = $('#left_tpl').html();
      
    
    $('body').on('click', function(e){
    		e = e || event;
    		var _el = $(e.target || e.srcElement);
    		if(_el.hasClass('ucnter_get_detail')){
    			var storyid = _el.attr('_storyid');
    			var userid = _el.attr('_userid');
    			
    			getData(storyid, userid, function(data){
    				if(data){
      				var render = _.template(tpl);
      				var html = render(data);
      				el.html(html); 
      				mask.show();
					$('.story').fadeIn('slow');
					//监听微信图片
					$('.story_avatar').on('mouseenter', function(){
						$('.story_weixin').fadeIn();
					});
					$('.story_avatar').on('mouseleave', function(){
						$('.story_weixin').fadeOut();
					});
    				}
    			});
    		}
    		
    		//点击覆盖层，消失
    		if(_el[0].id === '___wlh_mask'){
    			mask.hide();
    			$('.story').fadeOut('slow');
    		}
    		//点击关闭按钮消失
    		if(_el.hasClass('story_hide_close')){
    			mask.hide();
    			$('.story').fadeOut('slow');
    		}
    		
    });
    
    //获取数据
    function getData(storyid, userid, callback){
    		var userPath = '/user/get?userid=' + userid;
    		var storyPath = '/story/get/storyid?storyid=' + storyid;
    	
    		$.get(userPath, function(data){
    			if(data.status){
    				var user = data;
    				$.get(storyPath, function(item){
    					if(item.status){
    						var obj = {
    							username: user.username,
    							avatar: user.avatar,
    							time: item.time,
    							weibo: user.weibo,
    							liulan: 120,
    							content: item.content,
    							comments: item.comments,
    							weixin_pic: user.weixin_pic,
    							weixin: user.weixin
    						};
    						callback(obj);
    					}else{
    						callback(null);
    					}
		    		});
    			}else{
    				callback(null);
    			}
    		});
    }
   
});
