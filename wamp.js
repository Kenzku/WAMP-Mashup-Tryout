/**
 * User: Ken
 * Date: 27/02/2013
 * Time: 14:01
 * This is another server for WebSocket Application Messaging Protocol (WAMP)
 */

/**
 * Module dependencies.
 */

var express = require('express') //http://nodejs.org/api/modules.html#modules_modules
    , routes = require('./routes')
    , publish = require('./routes/publish.js')
    , subscribe = require('./routes/subscribe.js')
    , subscribe_2 = require('./routes/subscribe_2.js')
    , chatRoom = require('./routes/chatRoom.js')
    , chatRoom_on_node = require('./routes/chatRoom_on_node.js') // testing if Ratchet supports Prefix
    , chat = require('./routes/chatPhpExample.js')
    , user = require('./routes/user')
    , http = require('http')
    , path = require('path')
    , WebSocketServer = require('ws').Server
    , wampServer= require('./lib/wamp.io');

// "app" is a "request" object of the "_events" object in the "server"
var app = express();

// http.createServer(app) returns a server, "app" is called whenever an http request comes in
var server = http.createServer(app);
var wss = new WebSocketServer({server:server});
//var io = require('socket.io').listen(server);
var wamp = wampServer.attach(wss);


app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('your secret here'));
    app.use(express.session());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(routes.display404);
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

function middle(req, res, next) {
    req.wamp = wamp;
    next();
}

// get methods
app.get('/', routes.index);
app.get('/users', user.list);
app.get('/sub',subscribe.show);
app.get('/pubsub',subscribe_2.show);
app.get('/chat',chat.show);
app.get('/chatroom',chatRoom.show);
app.get('/chatroom_on_node',chatRoom_on_node.show);

// post methods
app.post('/hub', middle, publish.show);

server.listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});


