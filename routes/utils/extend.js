/**
 * 基于字面量的模型继承,主要是去除引用
 * 
 * @author: 王利华
 * @time: 2015-5-7
 * @email:lh_wang@ctrip.com
 * */
module.exports = function(obj){
	var newObj = null;
	try{
		newObj = JSON.stringify(obj);
	}catch(err){
		console.log('字面量是非JSON对象，无法继承');
	}
	return JSON.parse(newObj);
};
