
var mongodb = require('mongodb');
var Server = require('mongodb').Server;
var dbConfig = require('./DbConfig');


var server = new Server(dbConfig.host, dbConfig.port,{auto_reconnect:true});
var db = new mongodb.Db(dbConfig.dbname, server, {safe:true});

//打开链接
db.open(function(err, client){
    if(err) throw err;
    console.log('mongodb connected.........');
    db.authenticate(dbConfig.username, dbConfig.password, function(err, result) {
        console.log("connected:" + result);
    });
});

db.on('error', function(err){
    console.log('mongodb err.............');
    console.log(err);
});

//插入数据
function insertDoc(doc, coll, callback){
    db.collection(coll).insert(doc, function(err,docs){
        if(!err){
            //返回刚才插入数据的id
            var id=docs[0]['_id'];
            callback(id);
        }else{
            callback(false)
        }
        
    }); 
}


//查询数据
function queryDoc(mobile, id, coll, callback){
    db.collection(coll).find({'_id':new mongodb.ObjectID(id)}).toArray(function(err, items) {
        if(!err){
            callback(items);
        }else{
            callback(false);
        }
        
    });
   
}



var mongoSql={
    insertDoc:insertDoc,
    queryDoc:queryDoc
};

module.exports=mongoSql;
