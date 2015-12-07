var express = require('express');
var app = express();
var http  = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

var lastPosition = {x: 0, y: 0};

io.on('connection', function(socket){
	console.log('user has connected');
	socket.on('disconnect', function(){
		console.log('user has disconnected');
	});
	socket.on('hit', function(){
		socket.broadcast.emit('hitAll');
		socket.emit('hitAll');
	});
	socket.on('stand', function(){
		socket.broadcast.emit('standAll');
		socket.emit('standAll');
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});
