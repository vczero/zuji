
define(['jquery', 'underscore', 'js/common/mask', 'js/common/alert'], function($, _, mask, alert){
	var el = $('#left_tpl_div');
    var tpl = $('#left_tpl').html();
    var storyData = {};
    
    //显示故事面板
    $('body').on('click', function(e){
    		e = e || event;
    		var _el = $(e.target || e.srcElement);
    		if(_el.hasClass('ucnter_get_detail')){
    			var storyid = _el.attr('_storyid');
    			var userid = _el.attr('_userid');
    			
    			getData(storyid, userid, function(data){
    				if(data){
    					storyData = data;
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
    		if(_el[0].id === '___wlh_mask' && !$('#___wlh_alter')[0]){
    			mask.hide();
    			$('.story').fadeOut('slow');
    		}
    		//点击关闭按钮消失
    		if(_el.hasClass('story_hide_close')){
    			mask.hide();
    			$('.story').fadeOut('slow');
    		}
    		//添加评论
    		if($(_el[0].parentNode).hasClass('story_post')){
    			var story_text = $('#story_text_val');
    			var comment = story_text.val();
    			var storyid = story_text.attr('_storyid');
    			$.post('/story/addComment',{comment: comment, storyid: storyid}, function(data){
    				var opts = {
    					position: 'absolute',
    					top: '50%', 
    					marginTop: '-40px', 
    					left:'50%', 
    					marginLeft:'-100px'
    				};
    				if(data.status === 1){
    					//更新视图
    					var time = new Date().getFullYear() + '-' 
						+ (new Date().getMonth() + 1) + '-' 
						+ new Date().getDate();
    					storyData.comments.push({
    						time: time,
    						comment: comment
    					});
    					var render = _.template(tpl);
      				var html = render(storyData);
      				el.html(html);
    					
    				}
    				alert(data.info, opts, null, 15000);
    			});
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
    							storyid: item.storyid,
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
