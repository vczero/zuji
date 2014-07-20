var config = require('../config');
var Db = require('mongodb').Db;
var	Server = require('mongodb').Server;
var	Connection = require('mongodb').Connection;



var server = new Server(config.db.host,Connection.DEFAULT_PORT, {
	safe: true
});

module.exports = new Db(config.db.name, server);