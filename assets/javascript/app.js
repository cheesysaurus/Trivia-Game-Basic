// when page and content have finished loading
$(window).on("load", function() {


// GLOBAL VARIABLES
// =====================================================================================
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var timeRemaining = 30;
var userAnswers = []; // if user didn't answer, push undefined
var correctAnswers = ["Hola", "hola", "\"hola\"", "\"Hola\"", "Aesop", "Owl", "The Fifth Element", "Birds Nests"];
var intervalId; // variable to store setInterval
var isCounting = false; // variable to signal if timer is running


// FUNCTIONS
// =====================================================================================
// function to reset game
function initGame() {

	// reset form to blank

	// reset timer (clearInterval)
	clearInterval(intervalId);

	// start timer (setInterval)
	if (!isCounting) {
		intervalId = setInterval(count, 1000);
		isCounting = true;
	}

	// reset correct/incorrect/unanswered

	// reset array of user's answers
	userAnswers = [];

	// update html

}

// function to count down by one second
function count() {
	timeRemaining--;
	$("#time-remaining").html(timeRemaining);
}

// function to push user's answers to array
$("#done").on("click", function() {
	clearInterval(intervalId);
	var userInput = $("input");
	userAnswers.push(userInput.value);
	alert(userAnswers);
});


// MAIN PROCESS
// =====================================================================================
// initialize game
initGame();

// if time runs out before user clicks on submit
if (timeRemaining === 0) {

	clearInterval(intervalId);

	// show the number of questions player answered correctly and incorrectly

	// reset button
}
// else
else {

	// loop through both arrays and compare value at each index

		// if answer matches

			// increase correct answers

		// else if answer doesn't match

			// increase incorrect answers

		// else

			// increase unanswered

	// reset button

}

// Testing & Debugging
$("#pause").on("click", function() {
	clearInterval(intervalId);
	isCounting = false;
});

$("#start").on("click", function() {
	intervalId = setInterval(count, 1000);
	isCounting = true;
});

console.log(userAnswers);

});