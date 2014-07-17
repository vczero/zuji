
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
// var user = require('./routes/user');
var http = require('http');
var path = require('path');

var MongoStore = require('connect-mongo')(express); //本地存储中间件
var settings = require('./settings');
var flash = require('connect-flash');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
//___dirname全局变量，存储当前正在执行脚本所在目录
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(flash());
app.use(express.favicon());


//app.use(express.favicon(_dirname + '/public/images/favicon.ico'))
app.use(express.logger('dev'));
//app.use(express.bodyParser());//解析请求体
app.use(express.bodyParser({
	keepExtensions: true,
	uploadDir: './public/images',
	limit: '10mb'
}));
// app.use(express.json());
// app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));



//cookie和session支持
app.use(express.cookieParser());
//会话支持
app.use(express.session({
	secret: settings.cookieKey,
	key: settings.db, //cookie name
	cookie: {maxAge:1000*60*60*24*30}, //30天过期
	store: new MongoStore({
		db: settings.db
	})

}));

app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// app.get('/', routes.index);
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


routes(app);