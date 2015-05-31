
var mongoskin = require('mongoskin');
var config = require('../../config/connections');


module.exports = {
	
	/*************************************************/
	/*     创建guiderDB数据库链接实例，后续测试放入链接池  */
	/************************************************/
	getDB: function(){
		var host = config.host;
		var port = config.port;
		var guiderDB = config.connections[0];
		var dbname = guiderDB.dbname;
		var usename = guiderDB.username;
		var dbpsw = guiderDB.dbpsw;
		var str = this._concatStr(usename, dbpsw, host, port, dbname);
		
		var option = {
	        native_parser: true
	    };
		
		return mongoskin.db(str, option);
	},
	
	_concatStr: function(usename, dbpsw, host, port, dbname){
		return 'mongodb://' + usename + ':' + dbpsw + '@' + host + ':' + port + '/' + dbname;
	}
};
