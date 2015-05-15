

module.exports = {
	init: function(app){
		app.get('/', this.index);
		app.get('/example', this.example);
	},
	
	
	index: function(req, res){
		return res.render('index/main', {title: ''})
	},
	
	example: function(req, res){
		res.render('example/main', {title: '举例'})
	}
	
};
