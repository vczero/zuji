
var xss = require('xss');
var storyEngine = require('../engine/storyEngine');


module.exports = {
	init: function(app){
		app.post('/story/create', this.createStory);
		app.get('/story/get', this.getByUser);
		app.get('/story/get/400', this.getAll400);
		app.get('/story/get/storyid', this.getByStoryId);
		app.post('/story/addComment', this.addComments);
	},
	
	createStory: function(req, res){
		var errStatus = {
			status: 0
		};
		if(req.session.user && req.session.user.userid){
			var content = req.param('content');
			var time = req.param('time');
			var locname = req.param('locname');
			var lat = req.param('lat');
			var lng = req.param('lng');
			
			var location = {
				lat: xss(lat || ''),
				lng: xss(lng || '')
			};
		
			if(content && time && locname && lng && lat){
				storyEngine.create(req.session.user.userid, xss(content), xss(time), location, xss(locname), function(err, data){
					if(!err){
						data.status = 1;
						return res.send(data);
					}else{
						return res.send(errStatus);
					}
				});
				
			}else{
				return res.send(errStatus);
			}
			
		}else{
			return res.send({
				status: 2 /*未登录*/
			});
		}
	},
	
	getByUser: function(req, res){
		var errStatus = {
			status: 0
		};
		if(req.session.user && req.session.user.userid){
			storyEngine.getByUser(req.session.user.userid, function(err, items){
				if(!err){
					return res.send({
						status: 1,
						data: items
					});
				}else{
					return res.send(errStatus);
				}
			});
		}else{
			return res.send(errStatus);
		}
	},
	
	getAll400: function(req, res){
		storyEngine.getAllByLimit(400, function(err, items){
			if(!err){
				return res.send({
					status: 1,
					data: items	
				});
			}else{
				return res.send({
					status: 0
				});
			}
		});
	},
	
	getByStoryId: function(req, res){
		var id = req.param('storyid');
		storyEngine.getByStoryId(id, function(err, items){
			if(!err && items.length){
				items[0].status = 1;
				return res.send(items[0]);
			}else{
				return res.send({
					status: 0
				});
			}
		});
	},
	
	addComments: function(req, res){
		var storyid = req.param('storyid');
		var comment = req.param('comment') || '';
		var time = new Date().getFullYear() + '-' 
				+ (new Date().getMonth() + 1) + '-' 
				+ new Date().getDate();
		if(!req.session.user || !req.session.user.userid){
			return res.send({
				status: 0,
				info: '请登录后发表评论'
			});
		}
		
		if(!comment || !storyid){
			return res.send({
				status: 0,
				info: '请输入评论内容'
			});
		}
		
		var obj = {
			userid: req.session.user.userid,
			comment: xss(comment),
			time: time
		};
		
		storyEngine.updateComments(storyid, {comments: obj}, function(err, item){
			if(!err){
				return res.send({status: 1, info: '发表成功'});
			}else{
				return res.send({
					status: 0,
					info: '发表失败'
				});
			}
		});
		
	}
};










