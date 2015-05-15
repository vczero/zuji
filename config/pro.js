/**
 * Production Environment Settings:生产环境配置；该文件在部署打包的最后进行相关配置，以dev最为副本；
 * 私密信息不被提交至代码仓库，并且增加gitignore的过滤；
 * @author: 王利华
 * @time: 2015-5-7
 * @email:lh_wang@ctrip.com
 */

module.exports = {
	
	//production port change to 80
	port: 80,
	
	//log path in server
	log: 'server path',
	
	//加密算法修改
};
