var toObjectID = require('mongoskin').helper.toObjectID;
var uuid = require('node-uuid');
var mongo = require('../utils/mongo');
var extend = require('../utils/extend');
var Story = require('../models/storyModel').Story;
var StoryComment = require('../models/storyModel').StoryComment;
var db = mongo.getDB();
var TABLE_NAME = 'story';


db.bind(TABLE_NAME);

module.exports = {
	create: function(userid, content, time, location, locname, callback){
		var story = extend(Story);
		story.userid = userid;
		story.storyid = (new Date().valueOf()) + '-' + uuid.v4();
		story.content = content;
		story.time = time;
		story.createtime = new Date();
		story.location = location;
		story.locname = locname;
		
		db[TABLE_NAME].save(story, function(err, data){
			data = extend(story);
			callback(err, data);
		});
	},
	
	getByUser: function(userid, callback){
		db[TABLE_NAME].find({userid: userid}).limit(400).toArray(callback);
	},
	
	getAllByLimit: function(num, callback){
		db[TABLE_NAME].find({}).limit(num).toArray(callback);
	},
	
	getByStoryId: function(storyid, callback){
		db[TABLE_NAME].find({storyid: storyid}).limit(1).toArray(callback);
	},
	
	updateComments: function(storyid, comments, callback){
		db[TABLE_NAME].update(
			{storyid: storyid},
			{$push: comments},
			function(err, item){
				callback(err, item);
			}
		);
	}
};

