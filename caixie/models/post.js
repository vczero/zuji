var mongodb = require('./db');


function Post (article) {
	this.name = article.name;
	this.title = article.title;
	this.post = article.post;
}


module.exports = Post;

Post.prototype.save = function(callback){
	var date = new Date();
	
	var post = {
		name: this.name,
		time: date,
		title: this.title,
		post: this.post
	};


	mongodb.open(function(err, db){
		if(err){
			return callback(err);
		}

		db.collection('posts', function(err, collection){
			if(err){
				mongodb.close();
				return callback(err);
			}

			collection.insert(post, {safe: true}, function(err){
				mongodb.close();
				if(err){
					return callback(err);
				}

				callback(null);
			});
		});
	});
};


Post.get = function(name, callback){
	mongodb.open(function(err, db){
		if(err){
			return callback(err);
		}

		db.collection('posts', function(err, collection){
			if(err){
				mongodb.close();
				return callback(err);
			}

			var query = {};
			if(name){
				query.name = name;
			}

			collection.find(query).sort({ time: -1}).toArray(function(err, docs){
				mongodb.close();

				if(err){
					return callback(err);
				}
				callback(null, docs);
			});
		});
	});
};