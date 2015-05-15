/**
 * Development Environment Settings开发环境设置
 * 该模块主要针对预先定义的开发环境进行配置，需要确保开发环境和生产环境的不同;
 * 确保该文件在部署最后进行.gitignore的过滤；
 * 该文件可以被提交到版本库，相对应的pro.js在部署时做相应的调整。
 * @author: 王利华
 * @time: 2015-5-7
 * @email:lh_wang@ctrip.com
 */


/********************************************************************
 * 主要一些开发环境的配置信息                                           *
 * db connect in connection.js                                      *
 *******************************************************************/

module.exports = {
	
	//production port change to 80
	port: 3000,
	
	//log path in server
	log: 'server path',
	
	//session key
	
	//cookie key
	
};
