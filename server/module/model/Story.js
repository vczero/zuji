var Story = function(option){

	this.userid = ''; //用户ID
	this.location = {lng:'',lat:''}; //用户位置
	this.text = ''; //用户文本
	this.keywords = []; //文本关键字
	this.tags = []; //分词标签
	this.date = new Date(); //创建时间

	if(option){
		this.userid = option.userid || ''; 
		this.location = option.location || {lng:'',lat:''};
		this.text = option.text || '';
		this.keywords = option.keywords || [];
		this.tags = option.tags || [];
	}
}

Story.prototype = {
	
};