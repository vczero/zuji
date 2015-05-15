/**
 * 每个业务单独一个文件用于服务的路由，这样单独控制比较方便；
 * @author: 王利华
 * @time: 2015-5-7
 * @email:lh_wang@ctrip.com
 * */


module.exports = {
	
	/* 初始化首页相关的路由,init直接加载进内存
	 * @app: express app
	 * */
	init: function(app){
		app.get('/', this.index);
		app.get('/example', this.example);
	},
	
	/* 首页数据后端渲染模板结构
	 * @req: request
	 * @res: response
	 * */
	index: function(req, res){
		return res.render('index/main', {title: '启明星－首页'})
	},
	
	/* 开发举例，举例说明后端的模板结构，后面模板开发可以参考改目录结构
	 * @req: request
	 * @res: response
	 * */
	example: function(req, res){
		res.render('example/main', {title: '举例'})
	},
	
	
	/* 判断用户是否存在登录信息，show || show login
	 * @req: request
	 * @res: response
	 * */
	getUserInfo: function(req, res){
		
	},
	
	/* 获取公告信息
	 * @req: request
	 * @res: response
	 * */
	getPublicMessage: function(req, res){
		
	},
	
	/* 获取私有信息
	 * @req: request
	 * @res: response
	 * */
	getPrivateMessage: function(req, res){
		
	},
	
	
	getLeftPane: function(req, res){
		
	}
	
};
