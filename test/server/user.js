
var user = require('../../routes/engine/userEngine');


user.create('wanglihua', '123', 2, function(err, item){
	if(err){
		console.log('--------插入一个用户-------------');
		console.log(item);	
	}else{
		throw '数据库插入失败';
	}
});


user.getUserByName('wanglihua', function(err, items){
	if(err){
		console.log('--------通过用户名获取用户-------------');
		console.log(items.length);	
	}else{
		throw '数据库查询失败';
	}
});


