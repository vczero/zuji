/**
 * 数据库相关配置
 * 确保该文件在部署最后进行.gitignore的过滤；
 * @author: 王利华
 * @time: 2015-5-8
 * @email:lh_wang@ctrip.com
 */

module.exports = {
	
	//确保线上环境MongoDB分片集群部署
	host: '127.0.0.1',
	
	//在上线前需要修改对应的端口，最好映射到生产环境
	port: '27017',
	
	//
	connections: [
		//Base DB
		{
			dbname: 'guid',
			username: 'guid',
			dbpsw: 'guid',
			permissions: 'readWrite'
		},
		//Other DB
		{
			dbname: 'wiki',
			username: 'wiki',
			dbpsw: 'wiki',
			permissions: 'readWrite'
		}
	]
};
