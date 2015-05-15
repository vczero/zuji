/**
 * 用户模型，根据不同用户设定不同的权限。
 * 主要为后期扩展到公网准备
 * @author: 王利华
 * @time: 2015-5-7
 * @email: lh_wang@ctrip.com
 * */

module.exports.USER_TYPE = {
	ADMIN: 100, 			/*管理员,主要为了防0判断*/
	CTRIP: 1, 			/*携程员工*/
	OTHER: 2, 			/*其他人员*/
	
};

module.exports.User = {
	user_id: '',			/*用户ID，GUID生成*/
	user_name: '',    	/*用户名*/
	password: '',    	/*密码*/
	email: '',			/*邮箱*/
	create_time: '',  	/*创建时间*/
	update_time: '',  	/*更新时间*/
	user_type: 2,     	/*用户类型*/
	has_module:[],    	/*拥有模块*/
	last_login: '',   	/*最后登录时间*/
	ips: {
		last_ip: '',   	/*上次IP*/
		current_ip: ''	/*本次IP*/
	},		 
	score: 0,        	/*积分*/
	tags: []	,			/*贴标签*/
	avatar: '',			/*头像地址*/
	sign: ''	,			/*签名*/
	partment: '',		/*部门，只有携程员工才需要显示*/
};

