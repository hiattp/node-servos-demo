
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
	, Pusher = require('node-pusher');

var app = module.exports = express.createServer();
var io = require('socket.io').listen(app);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Socket.IO/Pusher event handlers
var pusher = new Pusher({
	appId: "your Pusher appID",
	key: "your Pusher key",
	secret: "your Pusher secret"
});

io.sockets.on("connection", function(socket){
	console.log("socket connection detected");
	socket.on("pan left", function(){pusher.trigger('servo_channel',"pan_left",{})});
	socket.on("pan right", function(){pusher.trigger('servo_channel',"pan_right",{})});
});

// Routes

app.get('/', routes.index);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
