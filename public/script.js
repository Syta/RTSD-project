

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
                "left: "+String(count_of_dealed_cards * 18) + "px;' />");
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
var player_totalValue = 0;
var player_money = 10;
var bet;
var valueAsInt;
var totalValueAsString;
var number;
var number1;
var number2;
var betting_phase;

$(document).ready(function(){
  var host = window.location.hostname;
  var socket = io.connect(host+":3000");
  betting_phase = true;

  $(".playerControlArea .playerButtons")
        .addClass("betting_state");
 
  $("#start").click( function() {
	if(betting_phase == false){	
		socket.emit('start');
	}
  });

  socket.on('startAll', function (data) {
	number = data.one;
	number1 = data.two;
	number2 = data.three;
	dealer_totalValue = 0;
	player_totalValue = 0;
	$("#wrap").replaceWith(divClone.clone(true));
	dealerStartCards();
	playerStartCards();
	$("#playerMoney").text("Money: "+player_money);

    $(".playerControlArea .playerButtons")
        .removeClass("betting_state")
        .addClass("playing_state");
  
  });

  $( "#bet").click( function () {
	if(betting_phase == true){
		socket.emit('bet');
		betting_phase = false;
	}
  });
  socket.on('betAll', function () {
	bet = $("#playerBet").val();
	if(bet <= player_money){
		player_money -= bet;
		$("#currentBet").text("Bet: "+bet);
		$("#playerMoney").text("Money: "+player_money);
	}
	else {alert("Can't afford the bet");}	
  });

  $( "#hit").click( function () {
	if(betting_phase == false){
		socket.emit('hit');
	} else {
		alert("Waiting for bets.");	
	}
  });
  socket.on('hitAll', function (data) {
		number = data;
		card = cards[number];
		valueAsInt = parseInt(values[number]);
		player_totalValue += valueAsInt;
		totalValueAsString = player_totalValue.toString();

        dealCard("playerCardOne", card);
		
        $("#playerValue").text("Player value: "+totalValueAsString);
  });

  $("#stand").click( function() {
	if(betting_phase == false){
		socket.emit('stand');
	} else {
		alert("Waiting for bets.");
	}	
  });

  socket.on('standAll', function (data) {
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
			player_money += bet * 1.5;
			$("#playerMoney").text("Money: "+player_money);
		} else if (dealer_totalValue > player_totalValue){
			$("#winner").append("<p>Dealer wins</p>");
			$("#currentBet").text("Bet: ");
		} else {
			$("#winner").append("<p>Player wins</p>");
			$("#currentBet").text("Bet: ");
			player_money += bet * 1.5;
			$("#playerMoney").text("Money: "+player_money);
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

    dealCard("playerCardOne", card);
    
	$("#playerValue").text("Player value: "+totalValueAsString);
}

