var mongodb = require('mongodb');
var Server = require('mongodb').Server;
var dbConfig = require('./DbConfig');


var server = new Server(dbConfig.host, dbConfig.port,{auto_reconnect:true});
var db = new mongodb.Db(dbConfig.db, server, {safe:true});

console.log(dbConfig);
