var express = require('express');
var app = express();
var http  = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index3.html');
});

var lastPosition = {x: 0, y: 0};

io.on('connection', function(socket){
	console.log('user has connected');
	socket.on('disconnect', function(){
		console.log('user has disconnected');
	});
	socket.on('doubleClick', function(){
		socket.broadcast.emit('doubleClickAll');
		socket.emit('doubleClickAll');
	});
	socket.emit('update_position', lastPosition);
	socket.on('receive_position', function(data){
		lastPosition = data;
		socket.broadcast.emit('update_position', data);
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});
