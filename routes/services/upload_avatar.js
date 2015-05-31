
var formidable = require('formidable');
var userEngine = require('../engine/userEngine');
var fs = require('fs');

module.exports = {
	init: function(app){
		app.post('/avatar/upload', this.upload_img);
	},
	upload_img: function(req, res){
		var form = new formidable.IncomingForm();
		var UPLOAD_DIR = 'public/avatar_img/';
		form.maxFieldsSize = 2 * 1024 * 1024;
		form.maxFields = 1000;
		form.uploadDir = UPLOAD_DIR;
		
	    form.parse(req, function(err, fields, files) {
	    		if(!req.session.user || !req.session.user.userid){
	    			return res.send({
	    				status: 0
	    			});
	    		}
	    		var userid = req.session.user.userid;
	    		var houzuis = files.file.name.split('.');
	    		var houzui = houzuis[houzuis.length-1];
	    		
	    		if(!err){
	      		var name = UPLOAD_DIR + userid + '.' + houzui;
	      		var obj = {
	      			status: 1
	      		};
	      		obj.path = name.split('public/')[1];
	        		fs.renameSync(files.file.path, name);
	        		//更新用户表的二维码地址
	        		userEngine.update(userid, {avatar: obj.path}, function(){
	        			if(err){
						return res.send({
							status: 0
						});
					}else{
						req.session.user = {
							userid: userid,
							username: req.session.user.username,
							email: req.session.user.email,
							weibo: req.session.user.weibo,
							weixin: req.session.user.weixin,
							avatar: obj.path,
							weixin_pic: req.session.user.weixin_pic,
							sign: req.session.user.sign
						};
						return res.send({
							status: 1
						});
					}
	        		});
	    		}else{
	    			return res.send({status: 0});
	    		}
	    });
	}
	
};

