
var xss = require('xss');
var storyEngine = require('../engine/storyEngine');


module.exports = {
	init: function(app){
		app.post('/story/create', this.createStory);
		app.get('/story/get', this.getByUser);
		app.get('/story/get/400', this.getAll400);
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
	}
};
