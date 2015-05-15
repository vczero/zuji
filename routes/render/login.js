/**
 * 用户登录模块
 * @author: 王利华
 * @time: 2015-5-11
 * @email:lh_wang@ctrip.com
 * */

module.exports = {
	/* 初始化登录路由,init直接加载进内存
	 * @app: express app
	 * */
	init: function(app){
		app.get('/login', this.login);
	},
	
	login: function(req, res){
		return res.render('login/main', {title: '启明星－登录'});
	}
};
