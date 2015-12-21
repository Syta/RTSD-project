

function dealCard(divClass, card){
    var jQueryDiv = "." + divClass;
    count_of_dealed_cards = $(jQueryDiv+" img.card").length;

    if(count_of_dealed_cards == 0){
        $(jQueryDiv).append( "<img class='card' " +
                "src='cards/resized/" + card + ".png' " + 
                "style='position: relative; top: 0; left: 0;' />");
    }
    else{
        $(jQueryDiv).append( "<img class='card' " +
                "src='cards/resized/" + card + ".png' " + 
                "style='position: absolute; " +
                "top: "+ String(-1 * count_of_dealed_cards * 18) + "px; " + 
                "left: "+String(count_of_dealed_cards * 32) + "px;' />");
    }


}




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
		"10","10","10","10","1","1","1","1","10","10","10","10",
		"10","10","10","10","10","10","10","10"];
var card;
var dealer_totalValue = 0;
var playerOne_totalValue = 0;
var playerTwo_totalValue = 0;
var player_money = 10;
var bet;
var valueAsInt;
var totalValueAsString;
var number;
var number1;
var number2;
var number3;
var number4;
var number5;
var number6;
var betting_phase;
var can_bet = true;
var userID;
var player_turn = 1;
var player_turn_id;
var player_count = 0;

$(document).ready(function(){
  var host = window.location.hostname;
  var socket = io.connect(host+":3000");
  betting_phase = true;
  $("#playerMoney").text("Money: "+player_money);

  $(".playerControlArea .playerButtons")
        .addClass("betting_state");
 
  socket.on('getID', function (data) {
  	userID = data;
	console.log("userID", userID);
  });
  
  socket.on('user_conn', function (data) {
  	player_count = data;
  });
  
  socket.on('user_disconn', function (data) {
  	player_count = data;
  });

  $("#start").click( function() {
	if(betting_phase == false){	
		socket.emit('start');
		socket.emit('player_turn');
	} else {
		alert("Waiting for bets.");
	}
  });

  socket.on('startAll', function (data) {
	number = data.one;
	number1 = data.two;
	number2 = data.three;
	number3 = data.four;
	number4 = data.five;
	number5 = data.six;
	number6 = data.seven;
	number7 = data.eight;
	number8 = data.nine;
	//player_turn_id = data.turn;
	dealer_totalValue = 0;
	playerOne_totalValue = 0;
	playerTwo_totalValue = 0;
	player_turn = 1;
	$("#wrap").replaceWith(divClone.clone(true));
	dealerStartCards();
	playerStartCards();
	$("#playerMoney").text("Money: "+player_money);
	$("#playerTurn").text("Player turn: "+player_turn);

	$(".playerControlArea .playerButtons")
	.removeClass("betting_state")
        .addClass("playing_state");
  });

  socket.on('player_turnAll', function (data) {
	player_turn_id = data;
	console.log("player_turn_id", player_turn_id);
  });

  $( "#bet").click( function () {
	if(betting_phase == true && can_bet == true){
		bet = $("#playerBet").val();
		if(bet <= player_money){
			player_money -= bet;
			$("#currentBet").text("Bet: "+bet);
			$("#playerMoney").text("Money: "+player_money);
			can_bet = false;
			socket.emit('bet');
		} else {alert("Can't afford the bet");}
	}else {alert("Can't bet");}
  });
  socket.on('betAll', function () {
	betting_phase = false;
  });

  $( "#hit").click( function () {
	if(betting_phase == false && player_turn_id == userID){
		socket.emit('hit');
	} else {
		alert("Waiting for bets.");	
	}
  });
  socket.on('hitAll', function (data) {
	if(player_turn == 1){
		number = data;
		card = cards[number];
		valueAsInt = parseInt(values[number]);
		playerOne_totalValue += valueAsInt;
		totalValueAsString = playerOne_totalValue.toString();
        	dealCard("playerOne", card);
        	$("#playerOneValue").text(totalValueAsString);
	} else if (player_turn == 2){
		number = data;
		card = cards[number];
		valueAsInt = parseInt(values[number]);
		playerTwo_totalValue += valueAsInt;
		totalValueAsString = playerTwo_totalValue.toString();
        	dealCard("playerTwo", card);
        	$("#playerTwoValue").text(totalValueAsString);
	}
  });

  $("#stand").click( function() {
	if(betting_phase == false && player_turn_id == userID){
		socket.emit('stand');
		socket.emit("player_turn");
	} else {
		alert("Waiting for bets.");
	}	
  });

  socket.on('standAll', function (data) {
	if(player_turn == player_count){
	can_bet = true;
        betting_phase = true;
        number = data.one;
        card = cards[number];
        valueAsInt = parseInt(values[number]);
        dealer_totalValue += valueAsInt;
        totalValueAsString = dealer_totalValue.toString();
        $(".dealerCardOne").append("<img class='card' src='cards/resized/" + card + ".png'></img>");
        $("#dealerValue").text("Dealer value: "+totalValueAsString);
        $("#backCard").hide();
   
        $(".playerControlArea .playerButtons")
        .removeClass("playing_state")
        .addClass("watching_state");

      if(dealer_totalValue < 17){
          number = data.two;
          card = cards[number];
          valueAsInt = parseInt(values[number]);
          dealer_totalValue += valueAsInt;
          totalValueAsString = dealer_totalValue.toString();
          $(".dealerCardOne").append("<img class='card' src='cards/resized/" + card + ".png'></img>");
          $("#dealerValue").text("Dealer value: "+totalValueAsString);
          if(dealer_totalValue < 17){
              number = data.three;
              card = cards[number];
              valueAsInt = parseInt(values[number]);
              dealer_totalValue += valueAsInt;
              totalValueAsString = dealer_totalValue.toString();
              $(".dealerCardOne").append("<img class='card' src='cards/resized/" + card + ".png'></img>");
              $("#dealerValue").text("Dealer value: "+totalValueAsString);
              if(dealer_totalValue < 17){
                  number = data.four;
                  card = cards[number];
                  valueAsInt = parseInt(values[number]);
                  dealer_totalValue += valueAsInt;
                  totalValueAsString = dealer_totalValue.toString();
                  $(".dealerCardOne").append("<img class='card' src='cards/resized/" + card + ".png'></img>");
                  $("#dealerValue").text("Dealer value: "+totalValueAsString);
                  if(dealer_totalValue < 17){
                      number = data.five;
                      card = cards[number];
                      valueAsInt = parseInt(values[number]);
                      dealer_totalValue += valueAsInt;
                      totalValueAsString = dealer_totalValue.toString();
                      $(".dealerCardOne").append("<img class='card' src='cards/resized/" + card + ".png'></img>");
                      $("#dealerValue").text("Dealer value: "+totalValueAsString);
                  }
              }
          }
      }

	if(dealer_totalValue == 21){
			$("#winner").append("<p>Dealer wins</p>");
			$("#currentBet").text("Bet: ");
		} else if(player_totalValue == 21) {
			$("#winner").append("<p>Player wins</p>");
			$("#currentBet").text("Bet: ");
			player_money += bet * 2.5;
			$("#playerMoney").text("Money: "+player_money);
		} else if (player_totalValue > 21){
			$("#winner").append("<p>Dealer wins</p>");
			$("#currentBet").text("Bet: ");
		} else if (dealer_totalValue > 21) {
			$("#winner").append("<p>Player wins</p>");
			$("#currentBet").text("Bet: ");
			player_money += bet * 2.0;
			$("#playerMoney").text("Money: "+player_money);
		} else if (dealer_totalValue > player_totalValue){
			$("#winner").append("<p>Dealer wins</p>");
			$("#currentBet").text("Bet: ");
		} else {
			$("#winner").append("<p>Player wins</p>");
			$("#currentBet").text("Bet: ");
			player_money += bet * 2.0;
			$("#playerMoney").text("Money: "+player_money);
		}
	} else {
		player_turn++;
		$("#playerTurn").text("Player turn: "+player_turn);
	}
  });

  var divClone = $("#wrap").clone(true);

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
	if(player_count == 1){
		card = cards[number1];
		valueAsInt = parseInt(values[number1]);
		playerOne_totalValue += valueAsInt;
		totalValueAsString = playerOne_totalValue.toString();
		$(".playerOne").append("<img class='card' src='cards/resized/" + card + ".png'></img>");
		$("#playerOneValue").text(totalValueAsString);
		card = cards[number2];
		valueAsInt = parseInt(values[number2]);
		playerOne_totalValue += valueAsInt;
		totalValueAsString = playerOne_totalValue.toString();
		dealCard("playerOne", card);
		$("#playerOneValue").text(+totalValueAsString);
	} else if (player_count == 2){
		card = cards[number1];
		valueAsInt = parseInt(values[number1]);
		playerOne_totalValue += valueAsInt;
		totalValueAsString = playerOne_totalValue.toString();
		$(".playerOne").append("<img class='card' src='cards/resized/" + card + ".png'></img>");
		$("#playerOneValue").text(totalValueAsString);
		card = cards[number2];
		valueAsInt = parseInt(values[number2]);
		playerOne_totalValue += valueAsInt;
		totalValueAsString = playerOne_totalValue.toString();
		dealCard("playerOne", card);
		$("#playerOneValue").text(totalValueAsString);

		card = cards[number3];
		valueAsInt = parseInt(values[number3]);
		playerTwo_totalValue += valueAsInt;
		totalValueAsString = playerTwo_totalValue.toString();
		$(".playerTwo").append("<img class='card' src='cards/resized/" + card + ".png'></img>");
		$("#playerTwoValue").text(totalValueAsString);
		card = cards[number4];
		valueAsInt = parseInt(values[number4]);
		playerTwo_totalValue += valueAsInt;
		totalValueAsString = playerTwo_totalValue.toString();
		dealCard("playerTwo", card);
		$("#playerTwoValue").text(totalValueAsString);
	}
}

