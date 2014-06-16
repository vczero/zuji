var mongodb = require('mongodb');
var config=require('../config/config');
var exception=require('../config/exception');


/**
 +----------------------------------------------------------
 * Mongodb的CRUD辅助功能模块
 * (1)这里，只针对特殊的数据模型CRUD
 * (2)这里，没有进行更高层次的封装
 +----------------------------------------------------------
 */
var host=config.dbConfig.host;
var port=config.dbConfig.port;
var dbName=config.dbConfig.dbName;
var username=config.dbConfig.username;
var password=config.dbConfig.password;
var collName=config.dbConfig.collName;
var serverOptions={
    
};
var dbOptions={
        logger:{
        doDebug:true,
        debug:function(msg,obj){
            console.log('[debug]',msg);
        },
        log:function(msg,obj){
            console.log('[log]',msg);
        },
        error:function(msg,obj){
            console.log('[error]',msg);
        }
    }
};


var server = new mongodb.Server(host,port,serverOptions);
var db=new mongodb.Db(dbName,server,dbOptions);


db.open(function(error,client){
    if(error) throw error;
    db.authenticate(username,password,function(err, result) {
        console.log("connected:"+result);
    });
    console.log('...........mongodb connected.........');
    
});

db.on('error',function(error){
    console.log('------------mongodb error--------');
    console.log(error);
});

//插入数据到mongodb，并且将刚刚插入的ObjectId值返回给回调
function insertDoc(doc,coll,callback){
    try{
        db.collection(coll).insert(doc,function(error,docs){
            var id=docs[0]['_id'];
            var pathinfo=docs[0]['content'];
            //encodeURIComponent
            var info={
                "id":id,
                "content":encodeURIComponent(pathinfo)
            };
            callback(info);
        });
    }catch(e){
        callback(exception.insertException);
    }
    
}


//在mongodb中查询信息，并返回path的信息
function queryDoc(mobile,id,coll,callback){
    try{
        db.collection(coll).find({'_id':new mongodb.ObjectID(id)}).toArray(function(err, items) {
            if (items) {
                if(items[0]){
                    callback(items[0]['content']);
                }else{
                    callback(0);
                }
            }
            else{
                callback(0);
            }
            
        });
    }catch(e){
        callback(exception.queryException);
    }
}

//定时删除小于某个时间点的数据
function removeDoc(coll){
    try{
        var date=new Date();
        var currentY=date.getFullYear();
        var currentM=date.getMonth();
        var currentD=date.getDate();
        var currentH=date.getHours();
        var newDate=new Date(currentY,currentM,currentD,2,30);//当天凌晨2点30之前的数据将被删除
        db.collection(coll).remove({time:{$lte:newDate}},function(err,result){
            console.log('-----------------remove over---------------------');
        });
    }catch(e){
        callback(exception.removeException);
    }
}

var mongoSql={
    insertDoc:insertDoc,
    queryDoc:queryDoc,
    removeDoc:removeDoc
};

module.exports=mongoSql;
//exports.insertDoc=insertDoc;
//exports.queryDoc=queryDoc;
//exports.removeDoc=removeDoc;