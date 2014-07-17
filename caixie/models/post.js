// var mongodb = require('./db'),
var mongodb = require('mongodb').Db;
    markdown = require('markdown').markdown;

var setttings = require('../settings');



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


	mongodb.connect(setttings.url,function(err, db){
		if(err){
			return callback(err);
		}

		db.collection('posts', function(err, collection){
			if(err){
				db.close();
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


Post.getAll = function(name, callback){
	mongodb.connect( setttings.url, function(err, db){
		if(err){
			return callback(err);
		}

		db.collection('posts', function(err, collection){
			if(err){
				db.close();
				return callback(err);
			}

			var query = {};
			if(name){
				query.name = name;
			}

			collection.find(query).sort({ time: -1}).toArray(function(err, docs){
				db.close();

				if(err){
					return callback(err);
				}

				//解析markdown
				docs.forEach(function(doc){
					doc.post = markdown.toHTML(doc.post);
				});

				callback(null, docs);
			});
		});
	});
};


Post.getOne = function(name, day, title, callback){
	mongodb.connect(setttings.url, function(err, db){
		if(err){
			return callback(err);
		}

		db.collection('posts', function(err, collection){
			if(err){
				db.close();
				return callback(err);
			}

			collection.findOne({
				"name": name,
				"time": day,
				"title": title
			}, function(err, doc){
				db.close();
				if(err){
					return callback(err);
				}

				doc.post = markdown.toHTML(doc.post);
				callback(null, doc);
			});

		});
	});
};