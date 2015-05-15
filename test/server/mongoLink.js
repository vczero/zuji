var assert = require('assert');
var mongo = require('../../routes/utils/helper');

describe('mongo link', function(){
	it('数据库链接应该是返回一个对象，并且无异常', function(){
		assert.equal(0, mongo.guiderDB()._state);
	});
	
});


