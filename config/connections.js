
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
