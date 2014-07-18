
var express = require('express'),
    http = require('http'),
    path = require('path'),
    MongoStore = require('connect-mongo')(express),
    routes = require('./routes'),
    config = require('./config');


var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon(__dirname + 'public/images/favicon.ico'));
app.use(express.logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser({
	keepExtensions: true,
	uploadDir: './public/images',
	limit: '10mb'
}));
app.use(express.cookieParser());
app.use(express.session({
	secret: config.cookiekey,
	key: config.db.name, 
	cookie: {maxAge:1000*60*60*24*7}, //一周过期
	url:config.db.url
}));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('5厘米的服务已经启动，秒速5cm。监听： ' + app.get('port'));
});