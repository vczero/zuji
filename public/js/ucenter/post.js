
define(['jquery', 'js/common/mapInit',  'js/common/alert'], function($, map, alert){
	var location = $('#location');
	var auto_complete = $('.auto_complete');
	var ul = $('.auto_complete_ul');
	var marker = null;
	var loc = null;
	
	//添加自动提示事件
	if(navigator.userAgent.indexOf('MSIE') < 0){
		location.on('input', function(){
			search(this);
		});
	}else{
		location.on('propertychange', function(){
			search(this);
		});	
	}
	
	//通过选择项设置marker
	$('.auto_complete_ul').on('click', function(e){
		auto_complete.css('display', 'none');
		var str = '';
		if(e.target.nodeName.toLocaleLowerCase() === 'span'){
			var li = e.target.parentNode;
			str += $(li).find('.auto_info').text();
			str += $(li).find('.auto_name').text();
		}
		location.val($(li).find('.auto_name').text());
		AMap.service(['AMap.Geocoder'], function(){
			var geo = new AMap.Geocoder();
			geo.getLocation(str, function(status, result){
				if(status === 'complete' && result.info === 'OK' && result.geocodes.length){
					
					loc = result.geocodes[0].location;
					//这里设置marker
					marker = new AMap.Marker({
						map: map,
						position: loc,
						icon: '/imgs/location7.png'
					});
					map.panTo(loc);
					map.setZoom(14);
					
				}else{
					
				}
			});
		});
	});
	
	//发表旅行日记
	var story_post = $('#story_post');
	var story_textarea = $('#story_textarea');
	var select_year = $('#select_year');
	var select_month = $('#select_month');
	var select_day = $('#select_day');
	
	story_post.on('click', function(){
		var year = select_year.val();
		var month = select_month.val();
		var day = select_day.val();
		var story = story_textarea.val();
		var locname = location.val();
		
		//校验
		if(!(isNum(year) && isNum(month) && isNum(day))){
			return alert('请选择正确的日期', {
				position: 'absolute',
				top: '200px',
				left: '60px'
			});
		}
		//景点和故事都不能为空
		if(!(loc && story && locname)){
			return alert('请输入景点和旅行日记', {
				position: 'absolute',
				top: '350px',
				left: '60px'
			});
		}
		//一切都ok，post数据到服务端
		var obj = {
			time: new Date(year, parseInt(month) - 1, day).getTime(),
			locname: locname,
			lat: loc.lat,
			lng: loc.lng,
			content: story
		};
		
		$.post('/story/create', obj, function(data){
			if(data.status === 1){
				story_textarea.val('');
				locname = location.val('');
				return alert('发表成功', {
					position: 'absolute',
					top: '40%',
					left: '40%'
				}, 1000);
			}else{
				return alert('请登录后再发表。', {
					position: 'absolute',
					top: '40%',
					left: '40%'
				});
			}
		});
		
	});
	
	
	//搜索请求
	function search(that){
		var _that = that;
		var text = $(that).val();
		AMap.service(['AMap.Autocomplete'], function(){
			var at = new AMap.Autocomplete();
			at.search(text, function(status, info){
				auto_complete.css('display', 'block');
				ul.empty();
				if(status === 'complete' && info.info === 'OK' && info.count){
					var str = '';
					for(var i in info.tips){
						str += '<li>' + '<span class="auto_name">' + info.tips[i].name + '</span>';
						str += '<span class="auto_info">' + info.tips[i].district +  '</span>';
						str += '</li>';
					}
					ul.append(str);
				}else{
					var nullStr = '<li>没有检索到数据</li>';
					ul.append(nullStr);
				}
			});
		});
	}
	
	//判断是否为数字
	function isNum(num){
		return !isNaN(num);
	}
	
});
