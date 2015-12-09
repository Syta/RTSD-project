var express = require('express');
var app = express();
var http  = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

var num1;
var num2;
var num3;
var num4;
var num5;
var num6;
var num7;
var num8;
var num9;
var num10;

io.on('connection', function(socket){
	console.log('user has connected');
	
	socket.on('start', function(){
		console.log('user has disconnected');
		num1 = 0 + Math.floor(Math.random() * 52);
		num2 = 0 + Math.floor(Math.random() * 52);
		num3 = 0 + Math.floor(Math.random() * 52);
		io.sockets.emit('startAll', {one: num1, two: num2, three: num3});
	});

	socket.on('disconnect', function(){
		console.log('user has disconnected');
	});
	socket.on('hit', function(){
		num1 = 0 + Math.floor(Math.random() * 52);
		io.sockets.emit('hitAll', num1);
	});
	socket.on('stand', function(){
		num1 = 0 + Math.floor(Math.random() * 52);
		num2 = 0 + Math.floor(Math.random() * 52);
		num3 = 0 + Math.floor(Math.random() * 52);
		num4 = 0 + Math.floor(Math.random() * 52);
		num5 = 0 + Math.floor(Math.random() * 52);
		num6 = 0 + Math.floor(Math.random() * 52);
		num7 = 0 + Math.floor(Math.random() * 52);
		num8 = 0 + Math.floor(Math.random() * 52);
		num9 = 0 + Math.floor(Math.random() * 52);
		num10 = 0 + Math.floor(Math.random() * 52);
		io.sockets.emit('standAll', {one: num1, two: num2, three: num3, four: num4,
			five: num5, six: num6, seven: num7, eight: num8, nine: num9, ten: num10});
	});
	socket.on('pickCard', function(){
		socket.broadcast.emit('pickCardAll');
	});

});

http.listen(3000, function(){
	console.log('listening on *:3000');
});
