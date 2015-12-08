var express = require('express');
var app = express();
var http  = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

var number;
var number1;
var number2;

io.on('connection', function(socket){
	console.log('user has connected');
	number = 0 + Math.floor(Math.random() * 52);
	//io.sockets.emit('userConnected', number);
	
	socket.on('start', function(){
		console.log('user has disconnected');
		number = 0 + Math.floor(Math.random() * 52);
		number1 = 0 + Math.floor(Math.random() * 52);
		number2 = 0 + Math.floor(Math.random() * 52);
		io.sockets.emit('startAll', {one: number, two: number1, three: number2});
	});

	socket.on('disconnect', function(){
		console.log('user has disconnected');
	});
	socket.on('hit', function(){
		number = 0 + Math.floor(Math.random() * 52);
		io.sockets.emit('hitAll', number);
	});
	socket.on('stand', function(){
		number = 0 + Math.floor(Math.random() * 52);
		io.sockets.emit('standAll', number);
	});
	socket.on('pickCard', function(){
		socket.broadcast.emit('pickCardAll');
	});

});

http.listen(3000, function(){
	console.log('listening on *:3000');
});

function generateNumber () {
	var num = 0 + Math.floor(Math.random() * 52);
	return num;
}
