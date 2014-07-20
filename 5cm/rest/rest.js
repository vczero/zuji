var UserRest = require('./userRest');


module.exports = function(app){
	app.post('/user/create', UserRest.create);
	app.post('/user/get', UserRest.get);
};