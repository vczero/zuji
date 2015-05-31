var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var async = require('async');
var session = require('express-session');
var app = express();

var routes = require('./routes/routes');
var config = require('./config/dev');

app.set('port', config.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(favicon(__dirname + '/public/imgs/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret: '#$5sdbshsh#@65si*2',
	resave: false,
	saveUninitialized: true
}));


var server = http.createServer(app);

//real time 
var io = require('socket.io')(server);
io.on('connection', function(socket){
	socket.on('event', function(data){
		console.log('-----a user---------');
	});
	socket.on('disconnect', function(){});
});

server.listen(app.get('port'));

server.on('listening', function(){
	console.log('----------listening on port: ' + app.get('port') +'----------------------');
});

server.on('error', function(error){
	switch (error.code) {
    		case 'EACCES':
      	console.error(bind + '需要权限许可');
     	process.exit(1);
      	break;
    case 'EADDRINUSE':
      	console.error(bind + '端口已被占用');
      	process.exit(1);
     	 break;
    default:
      	throw error;
  	}
});


async.waterfall([
    function(callback){
    		routes(app);
    		callback(null);
    },
    function(){
    		app.use(function(req, res, next) {
			var err = new Error('Not Found');
			err.status = 404;
			next(err);
		});
		
		if (app.get('env') === 'development') {
			app.use(function(err, req, res, next) {
		    res.status(err.status || 500);
		    res.render('common/error', {
		    		message: err.message,
		      	error: err
		    });
		  });
		}
		
		app.use(function(err, req, res, next) {
			res.status(err.status || 500);
			res.render('common/error', {
				message: err.message,
		    		error: {}
		  });
		});
    }
]);













