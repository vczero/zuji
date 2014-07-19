var config = require('../config');
var Db = require('mongodb').Db;
var	Server = require('mongodb').Server;
var	Connection = require('mongodb').Connection;



var server = new Server(config.db.host,config.port, {
	safe: true
});

module.exports = new Db(config.db.name, server);