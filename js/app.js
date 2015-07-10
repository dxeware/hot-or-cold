var maxGuess = 100;
var secretNum = 100000;
var guessCount, recentGuess;

var DEBUG_MODE = true;
var debug = function(msg) {
    if (DEBUG_MODE === true) {
        console.log("DEBUG:", msg);
    }
};

$(document).ready(function(){

  // Default to new game when page loads
  newGame();

	/*--- Display information modal box ---*/
	$(".what").click(function(){
    $(".overlay").fadeIn(1000);

	});

	/*--- Hide information modal box ---*/
	$("a.close").click(function(){
		$(".overlay").fadeOut(1000);
	});

  // Start new game when +NEW GAME clicked
  $(".new").click(function(){
    newGame();
  });

  // Validate guess and give feedback when Guess button clicked
  $("#guessButton").click(function(){

    var guessNum;
    var input = document.getElementById("userGuess");
    var guessStr = input.value;
    debug("User guess: " + guessStr);

    // Validate guess and if legal, give user feedback
    if ( -1 !== (guessNum = validateGuess(guessStr)) ) {
      guessCount++;
      $('span#count').text(guessCount);
      giveFeedback(guessNum, secretNum);

      // Save recent guess
      recentGuess = guessNum;
    }

    // Clear guess input
    input.value = '';
  });

  function validateGuess(num) {

    var msg = "Please enter an integer between 1 and " + maxGuess;

    if  ( ( +num % 1 !== 0 ) || ( num[0] === '0' ) || (num > maxGuess) ) {
      alert(msg);
      return -1;
    } else {
      num = parseInt(num, 10);

      if ( ( isNaN(num) ) || ( num <= 0 ) ) {
        alert(msg);
        return -1;
      }
    }

    $( 'ul#guessList').append('<li>' + num + '</li>');

    return num;

  }

  function giveFeedback(guess, secretNum) {
    var newDiff, recentDiff;
    var feedback = '';

    newDiff = Math.abs(secretNum - guess);
    debug("New Diff = " + newDiff);

    if (newDiff === 0) {
      feedback = 'CORRECT!<br>Press +NEW GAME to play again!';
    } else if (recentGuess === 0) { // This is the first guess

      if (newDiff < 10 ) {
        feedback = 'Very Hot';
      } else if (newDiff < 20 ) {
        feedback = 'Hot';
      } else if (newDiff < 30 ) {
        feedback = 'Warm';
      } else if (newDiff < 50 ) {
        feedback = 'Cold';
      } else {
        feedback = 'Ice Cold';
      }
    } else { // This is for guesses that aren't the first
      recentDiff = Math.abs(secretNum - recentGuess);
      debug("Recent Diff = " + recentDiff);

      if (recentDiff === newDiff) {
        feedback = 'JUST as COLD/WARM :)';
      } else if (recentDiff > newDiff) {
        feedback = 'WARMER!';
      } else {
        feedback = 'COLDER!';
      }
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

    debug("New game!");
    guessCount = 0;
    recentGuess = 0;

    // Reset feedback text
    $('#feedback').text('Make your Guess!');

    // Reset guess count display
    $('span#count').text(guessCount);

    // Empty the guess list
    $('ul#guessList').empty();

    secretNum = generateRandomNumber(maxGuess);
    $('#secret').text(secretNum);

    debug("Secret number: " + secretNum);

  }

});

