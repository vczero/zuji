
var fs = require("fs");

module.exports = function(app){
	var FS_PATH_RENDER = './routes/render/';
	var REQUIRE_PATH_RENDER = './render/';
	var FS_PATH_SERVICES = './routes/services/';
	var REQUIRE_PATH_SERVICES = './services/';
	
	fs.readdir(FS_PATH_RENDER, function(err, list){
		if(err){
			throw '没有找到该文件夹，请检查......'
		}
		for (var e; list.length && (e = list.shift());){
			var render = require(REQUIRE_PATH_RENDER + e);
			render.init && render.init(app);
		}
	});
	
	fs.readdir(FS_PATH_SERVICES, function(err, list){
		if(err){
			throw '没有找到该文件夹，请检查......'
		}
		for (var e; list.length && (e = list.shift());){
			var service = require(REQUIRE_PATH_SERVICES + e);
			service.init && service.init(app);
		}
	});
};