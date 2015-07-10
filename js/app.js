var maxGuess = 100;
var secretNum = 100000;

var DEBUG_MODE = true;
var debug = function(msg) {
    if (DEBUG_MODE === true) {
        console.log("DEBUG:", msg);
    }
};

$(document).ready(function(){


	/*--- Display information modal box ---*/
	$(".what").click(function(){
    $(".overlay").fadeIn(1000);

	});

	/*--- Hide information modal box ---*/
	$("a.close").click(function(){
		$(".overlay").fadeOut(1000);
	});

  $(".new").click(function(){
    newGame();
  });

  $("#guessButton").click(function(){
    var guessNum;
    var input = document.getElementById("userGuess");
    var guessStr = input.value;
    debug("User guess: " + guessStr);

    if ( -1 !== (guessNum = validateGuess(guessStr)) ) {
      giveFeedback(guessNum, secretNum);
    }

    input.value = '';
  });

  function validateGuess(num) {

    var msg = "Please enter an integer between 1 and " + maxGuess;

    if  ( ( +num % 1 !== 0 ) || ( num[0] === '0' ) || (num > maxGuess) ) {
      alert(msg);
      return -1;
    } else {
      endRange = parseInt(num, 10);

      if ( ( isNaN(endRange) ) || ( endRange <= 0 ) ) {
        alert(msg);
        return -1;
      }
    }

    return endRange;

  }

  function giveFeedback(guess, secretNum) {
    var difference;
    var feedback = '';

    difference = Math.abs(secretNum - guess);
    debug("Difference = " + difference);

// For instance, you might decide that if
//a user is 50 or further away from the
//secret number, they are told they are
//“Ice cold”, if they are between 30 and 50
//they are “cold”, if they are between 20 and 30 they are warm,
//between 10 and 20 hot,
//and between 1 and 10 “very hot”.
    if (difference >= 50) {
      feedback = 'Ice Cold';
    } else if ( (difference >= 30 ) && (difference < 50 ) ) {
      feedback = 'Cold';
    } else if ( (difference >= 20 ) && (difference < 30 ) ) {
      feedback = 'Warm';
    } else if ( (difference >= 10 ) && (difference < 20 ) ) {
      feedback = 'Hot';
    } else if ( (difference >= 1 ) && (difference < 10 ) ) {
      feedback = 'Very Hot';
    } else {
      feedback = 'CORRECT!<br>Press +NEW GAME to play again!';
    }

    debug("You are " + feedback);
    $('#feedback').html("You are " + feedback);

  }

  function generateRandomNumber(upperRange) {
    var randomNum = Math.floor((Math.random() * upperRange) + 1);

    debug("Random number: upperRange: " + upperRange + " Random Num: " + randomNum);

    return randomNum;
  }

  function newGame() {

    //var secretNum;
    debug("New game!");

    secretNum = generateRandomNumber(maxGuess);
    $('#secret').text(secretNum);

    debug("Secret number: " + secretNum);


  }

});

