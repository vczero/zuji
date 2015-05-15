
module.exports = function(obj){
	var newObj = null;
	try{
		newObj = JSON.stringify(obj);
	}catch(err){
		console.log('字面量是非JSON对象，无法继承');
	}
	return JSON.parse(newObj);
};
