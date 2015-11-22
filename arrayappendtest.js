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

$(document).ready(function(){
 
  $( "#dealerCards").click(
	function () {
		number = 0 + Math.floor(Math.random() * 52);
		card = cards[number];
		valueAsInt = parseInt(values[number]);
		dealer_totalValue += valueAsInt;
		totalValueAsString = dealer_totalValue.toString();
		$(".dealerCardOne").append("<img class='card' src=resized/" + card + ".png></img>");
		$("#dealerValue").text("Dealer value: "+totalValueAsString);
		number = 0 + Math.floor(Math.random() * 52);
		card = cards[number];
		valueAsInt = parseInt(values[number]);
		dealer_totalValue += valueAsInt;
		totalValueAsString = dealer_totalValue.toString();
		$(".dealerCardTwo").append("<img class='card' src=resized/" + card + ".png></img>");
		$("#dealerValue").text("Dealer value: "+totalValueAsString);
	});

$( "#playerCards").click(
	function () {
		number = 0 + Math.floor(Math.random() * 52);
		card = cards[number];
		valueAsInt = parseInt(values[number]);
		player_totalValue += valueAsInt;
		totalValueAsString = player_totalValue.toString();
		$(".dealerCardOne").append("<img class='card' src=resized/" + card + ".png></img>");
		$("#playerValue").text("Player value: "+totalValueAsString);
		number = 0 + Math.floor(Math.random() * 52);
		card = cards[number];
		valueAsInt = parseInt(values[number]);
		player_totalValue += valueAsInt;
		totalValueAsString = player_totalValue.toString();
		$(".dealerCardTwo").append("<img class='card' src=resized/" + card + ".png></img>");
		$("#playerValue").text("Player value: "+totalValueAsString);
	});
});
