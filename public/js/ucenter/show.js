

define(['jquery', 'js/common/mapInit'], function($, map){
	
	$.get('/story/get', function(data){
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
			var info = new AMap.InfoWindow({
				offset: new AMap.Pixel(0,-23), 
				content: addContent(item)
			});	
			info.open(map, marker.getPosition());
		});
	}
	
	//修饰infowindow
	function addContent(item){
		var css = '<style type="text/css">';
		css += '.add_content{max-height:200px;overflow-y:hidden;line-height:20px;}';
		css += '.add_author_date{color:#19B7FF; line-height:20px;} .add_author_date span{color:#000;}';
		css += '.add_delete_btn{border:1px solid #ccc;height:26px;text-align:center;line-height:26px;';
		css += 'border-radius:3px;margin-bottom:-10px;width:150px;cursor:pointer;}';
		css += '</style>';
		
		var str = '<div>';
		str += '<div class="add_author_date"><span>作者：</span>xxx  <span>日期:</span>2015-5-2</div>';	
		str += '<div class="add_author_date"><span>地点:</span>黄果树瀑布</div>';	
		str += '<div class="add_content">行记：' + item.content + '</div>';
		str += '</div>';
		
		var comment = '<div class="add_content">';
		comment += '<div>评论:</div>';
		comment += '<div>1评论:</div>';
		comment += '<div>2评论:</div>';
		comment += '<div>3评论:</div>';
		comment += '<div>4评论:</div>';
		comment += '<div>1评论:</div>';
		comment += '<div>2评论:</div>';
		comment += '<div>3评论:</div>';
		comment += '<div>4评论:</div>';
		comment += '<div>3评论:</div>';
		comment += '<div>4评论:</div>';
		
		comment += '<div>评论:</div>';
		comment += '<div>1评论:</div>';
		comment += '<div>2评论:</div>';
		comment += '<div>3评论:</div>';
		comment += '<div>4评论:</div>';
		comment += '<div>1评论:</div>';
		comment += '<div>2评论:</div>';
		comment += '<div>3评论:</div>';
		comment += '<div>4评论:</div>';
		comment += '<div>3评论:</div>';
		comment += '<div>4评论:</div>';
		
		comment += '<div>评论:</div>';
		comment += '<div>1评论:</div>';
		comment += '<div>2评论:</div>';
		comment += '<div>3评论:</div>';
		comment += '<div>4评论:</div>';
		comment += '<div>1评论:</div>';
		comment += '<div>2评论:</div>';
		comment += '<div>3评论:</div>';
		comment += '<div>4评论:</div>';
		comment += '<div>3评论:</div>';
		comment += '<div>4评论:</div>';
		comment += '</div>';
		
		var btn = '<div style="width:100%;hieght:30px;">';
		btn += '<div class="add_delete_btn ucnter_get_detail mrl">查看详情</div>';
		btn += '</div>';
		return css + str + comment + btn;
	}
	
});
