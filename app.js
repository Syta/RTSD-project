
/* Shuffles an array.
 * Source: http://stackoverflow.com/a/6274381
 */
function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}



/* Creates and shuffles card deck for gameplay.
 *
 *
 */
function initializeDeck(deckCount){
    if(deckCount < 2){
        deckCount = 2;
    }

    var cardDeck = [];
    for( i=0; i<(52 * deckCount)-1; i++){
        cardDeck.push( 0 + (i % 52) );
    }
    shuffle(cardDeck);
    return cardDeck;

}


var express = require('express');
var app = express();
var http  = require('http').Server(app);
var io = require('socket.io')(http);

var deckCount = 3;

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
var num11;
var clients = [];
var user = 0;
var bets_placed = 0;
var player_turn_id;
var player_turn = 0;

io.on('connection', function(socket){
    console.log('user has connected');
    var cardDeck = initializeDeck(deckCount);
    clients.push(socket.id);
    io.to(clients[user]).emit('getID', socket.id);
    user++;
    io.sockets.emit('user_conn', user);

    socket.on('start', function(){
        cardDeck = initializeDeck(deckCount);
        console.log("card deck initialized");
        num1 = cardDeck.pop();
        num2 = 0 + cardDeck.pop();
        num3 = 0 + cardDeck.pop();
		num4 = 0 + cardDeck.pop();
        num5 = 0 + cardDeck.pop();
        num6 = 0 + cardDeck.pop();
        num7 = 0 + cardDeck.pop();
        num8 = 0 + cardDeck.pop();
        num9 = 0 + cardDeck.pop();
        num10 = 0 + cardDeck.pop();
        num11 = 0 + cardDeck.pop();
		bets_placed = 0;
		player_turn = 0;
        io.sockets.emit('startAll', {one: num1, two: num2, three: num3, four: num4,
            five: num5, six: num6, seven: num7, eight: num8, nine: num9, ten: num10, eleven: num11});
    });

    socket.on('player_turn', function(){
	if(player_turn <= clients.length){
		player_turn_id = clients[player_turn];
		io.sockets.emit('player_turnAll', player_turn_id);
		player_turn++;
	}
    });

    socket.on('disconnect', function(){
        console.log('user has disconnected');
	clients.pop(user);
	user--;
	if(user <= 0){
		bets_placed = 0;
		player_turn = 0;
		clients.length = 0;
	}
        io.sockets.emit('user_disconn', user);
    });
    socket.on('hit', function(){
        num1 = 0 + cardDeck.pop();
        io.sockets.emit('hitAll', num1);
    });
    socket.on('bet', function(){
	bets_placed++;	
	if(bets_placed == user){        
		io.sockets.emit('betAll');
	}
    });
    socket.on('stand', function(){
        num1 = 0 + cardDeck.pop();
        num2 = 0 + cardDeck.pop();
        num3 = 0 + cardDeck.pop();
        num4 = 0 + cardDeck.pop();
        num5 = 0 + cardDeck.pop();
        num6 = 0 + cardDeck.pop();
        num7 = 0 + cardDeck.pop();
        num8 = 0 + cardDeck.pop();
        num9 = 0 + cardDeck.pop();
        num10 = 0 + cardDeck.pop();
	bets_placed = 0;
        io.sockets.emit('standAll', {one: num1, two: num2, three: num3, four: num4,
            five: num5, six: num6, seven: num7, eight: num8, nine: num9, ten: num10});
    });

});

http.listen(3000, function(){
    console.log('listening on *:3000');
});


