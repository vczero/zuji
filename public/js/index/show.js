
define(['jquery', 'js/common/mapInit'], function($, map){
	$.get('/story/get/400', function(data){
		if(data.status === 1){
			var items = data.data;
			var markers = [];
			for(var i in items){
				addMarker(items[i]);
			}
			map.setFitView();
		}
	});
	
	//添加marker
	function addMarker(item){
		var marker = new AMap.Marker({
			map: map,
			position: new AMap.LngLat(item.location.lng, item.location.lat)
		});
		
		AMap.event.addListener(marker, 'mouseover', function(){
			addContent(item, function(data){
				var info = new AMap.InfoWindow({
					offset: new AMap.Pixel(0,-23), 
					content: data
				});
				info.open(map, marker.getPosition());
			});
		});
	}
	
	//修饰infowindow
	function addContent(item, callback){
		var css = '<style type="text/css">';
		css += '.add_content{max-height:200px;overflow-y:hidden;line-height:20px;}';
		css += '.add_author_date{color:#19B7FF; line-height:20px;cursor:pointer;} .add_author_date span{color:#000;}';
		css += '.add_delete_btn{background-color:#88C932;color:#fff;height:30px;text-align:center;line-height:30px;';
		css += 'border-radius:3px;margin-bottom:-10px;width:100px;cursor:pointer;}';
		css += '</style>';
		
		var path = '/user/get?userid=' + item.userid;
		$.get(path, function(data){
			if(data.status){
				var user = data;
				var str = '<div style="max-height:200px;">';
				str += '<div class="add_author_date"><span>作者：</span>' + user.username || '用户未公开';
				str += '<span>日期：</span>' + item.time + '</div>';
				str += '<div class="add_author_date"><span>地点：</span>' + item.locname + '</div>';	
				str += '<div class="add_content">行记：' + item.content + '</div>';
				str += '</div>';
				
				var btn = '<div style="width:100%;hieght:30px;margin-top:20px;">';
				btn += '<div class="add_delete_btn ucnter_get_detail mrl"'; 
				btn += '_storyid="' + item.storyid + '" _userid="' + item.userid + '">查看详情</div>';
				btn += '</div>';
				callback(css + str + btn);
			}
		});
	}
});
