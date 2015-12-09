var cards = ["2_of_clubs","2_of_diamonds","2_of_hearts","2_of_spades",
	"3_of_clubs","3_of_diamonds","3_of_hearts","3_of_spades",
	"4_of_clubs","4_of_diamonds","4_of_hearts","4_of_spades",
	"5_of_clubs","5_of_diamonds","5_of_hearts","5_of_spades",
	"6_of_clubs","6_of_diamonds","6_of_hearts","6_of_spades",
	"7_of_clubs","7_of_diamonds","7_of_hearts","7_of_spades",
	"8_of_clubs","8_of_diamonds","8_of_hearts","8_of_spades",
	"9_of_clubs","9_of_diamonds","9_of_hearts","9_of_spades",
	"10_of_clubs","10_of_diamonds","10_of_hearts","10_of_spades",
	"ace_of_clubs","ace_of_diamonds","ace_of_hearts","ace_of_spades",
	"jack_of_clubs","jack_of_diamonds","jack_of_hearts","jack_of_spades",
	"queen_of_clubs","queen_of_diamonds","queen_of_hearts","queen_of_spades",
	"king_of_clubs","king_of_diamonds","king_of_hearts","king_of_spades"];
var values = ["2","2","2","2","3","3","3","3","4","4","4","4","5","5","5","5",
		"6","6","6","6","7","7","7","7","8","8","8","8","9","9","9","9",
		"10","10","10","10","1","1","1","1","11","11","11","11",
		"12","12","12","12","13","13","13","13"];
var card;
var dealer_totalValue = 0;
var player_totalValue = 0;
var valueAsInt;
var totalValueAsString;
var number;
var number1;
var number2;

$(document).ready(function(){
  var host = window.location.hostname;
  var socket = io.connect(host+":3000");
  
  $("#start").click( function() {
		socket.emit('start');
  });

  socket.on('startAll', function (data) {
	number = data.one;
	number1 = data.two;
	number2 = data.three;
	dealerStartCards();
	playerStartCards();
  });

  $( "#hit").click( function () {
		socket.emit('hit');
  });
  socket.on('hitAll', function (data) {
		number = data;
		card = cards[number];
		valueAsInt = parseInt(values[number]);
		player_totalValue += valueAsInt;
		totalValueAsString = player_totalValue.toString();
		$(".playerCardOne").append("<img class='card' src='cards/resized/" + card + ".png'></img>");
		$("#playerValue").text("Player value: "+totalValueAsString);
  });

  $("#stand").click( function() {
		socket.emit('stand');
  });

  socket.on('standAll', function (data) {
      if(dealer_totalValue == 21){
			$("#winner").append("<p>Dealer wins</p>");
		} else if(player_totalValue == 21) {
			$("#winner").append("<p>Player wins</p>");
		} else if (dealer_totalValue > player_totalValue){
			$("#winner").append("<p>Dealer wins</p>");
		} else if (player_totalValue > 21){
			$("#winner").append("<p>Dealer wins</p>");
		} else if (dealer_totalValue > 21) {
			$("#winner").append("<p>Player wins</p>");
		} else {
			$("#winner").append("<p>Player wins</p>");
		}

		number = data;
		card = cards[number];
		valueAsInt = parseInt(values[number]);
		dealer_totalValue += valueAsInt;
		totalValueAsString = dealer_totalValue.toString();
		$(".dealerCardOne").append("<img class='card' src='cards/resized/" + card + ".png'></img>");
		$("#dealerValue").text("Dealer value: "+totalValueAsString);
		$("#backCard").hide();
  });

});

function dealerStartCards (){
	card = cards[number];
	valueAsInt = parseInt(values[number]);
	dealer_totalValue += valueAsInt;
	totalValueAsString = dealer_totalValue.toString();
	$(".dealerCardOne").append("<img class='card' src=cards/resized/" + card + ".png></img>");
	$("#dealerValue").text("Dealer value: "+totalValueAsString);
	$(".dealerCardOne").append("<img class='card' id='backCard' src='cards/resized/back.png'></img>");
}

function playerStartCards (){
	card = cards[number1];
	valueAsInt = parseInt(values[number1]);
	player_totalValue += valueAsInt;
	totalValueAsString = player_totalValue.toString();
	$(".playerCardOne").append("<img class='card' src='cards/resized/" + card + ".png'></img>");
	$("#playerValue").text("Player value: "+totalValueAsString);
	card = cards[number2];
	valueAsInt = parseInt(values[number2]);
	player_totalValue += valueAsInt;
	totalValueAsString = player_totalValue.toString();
	$(".playerCardOne").append("<img class='card' src='cards/resized/" + card + ".png'></img>");
	$("#playerValue").text("Player value: "+totalValueAsString);
}

