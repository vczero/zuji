
/*
 *  
 * 地图初始化
 * 
 * */

define(['jquery'], function($){
	var map_style = $('.map_style');
	var map = new AMap.Map('map', {
		resizeEnable: true,
		mapStyle: 'fresh',
		zoom: 10
	});
	var styles = [
		'normal',
		'dark',
		'light',
		'fresh'
	];
	

	map.plugin(['AMap.ToolBar'],function(){
		var tool = new AMap.ToolBar();
		map.addControl(tool);
	});
	
	map_style.on('click', function(e){
		var index = $(e.target).attr('mapstyle');
		map.setMapStyle(styles[index]);
	});
	
	return map;
	
});
