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
    var input = document.getElementById("userGuess");
    var num = input.value;
    debug("User guess: " + num);
    /*if  ( ( +num % 1 !== 0 ) || ( num[0] === '0' ) ) {
      alert('Please enter an integer greater than 0!');
    } else {
      endRange = parseInt(num, 10);

      if ( ( isNaN(endRange) ) || ( endRange <= 0 ) ) {
        alert('Please enter an integer greater than 0!');
      }
    }

    input.value = '';
    */

  });

});

function generateRandomNumber(upperRange) {
  var randomNum = Math.floor((Math.random() * upperRange) + 1);

  debug("Random number: upperRange: " + upperRange + " Random Num: " + randomNum);

  return randomNum;
}

function newGame() {
  var secretNum;

  debug("New game!");

  secretNum = generateRandomNumber(100);


}


