
//用户发表的故事
var Story = function(option){
	this.userid = ''; //用户ID
	this.location = {lng:'',lat:''}; //用户位置
	this.text = ''; //用户文本
	this.keywords = []; //文本关键字
	this.tags = []; //分词标签
	this.date = new Date(); //创建时间
	this.pics = [];//图片的地址数组

	if(option){
		this.userid = option.userid || ''; 
		this.location = option.location || {lng:'',lat:''};
		this.text = option.text || '';
		this.keywords = option.keywords || [];
		this.tags = option.tags || [];
		this.pics = option.pics || [];
	}
}

Story.prototype = {
	setUserid: function(userid){
		this.userid = userid;
	},

	setLocation: function(location){
		this.location = location;
	},

	setText: function(text){
		this.text = text;
	},

	setKeywords: function(keywords){
		this.keywords = keywords;
	},

	setTags: function(tags){
		this.tags = tags;
	},

	setPics: function(pics){
		this.pics = pics;
	},

	getUserid: function(){
		return this.userid;
	},

	getLocation: function(){
		return this.location;
	},

	getText: function(){
		return this.text;
	},

	getKeywords: function(){
		return this.keywords;
	},

	getTags: function(){
		return this.tags;
	},

	getPics: function(){
		return this.pics;
	}

};