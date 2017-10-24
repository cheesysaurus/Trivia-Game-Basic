// Notes:
// 1) Get all of the code to work first, and then worry about optimizing
// 2) Use console.log & chrome inspector to debug and give you more information! It really does help
// 3) Not all stack overflow answers are necessarily correct. Test it out for yourself 
// // maybe on jsfiddle or jsbin before using

// Residual questions/issues:
// 1) How to make capturing the value of each input into a function (lines 202-230)


// GLOBAL VARIABLES
// ========================================================================================
// user stats
var correct = 0;
var incorrect = 0;
var unanswered = 0;

// quiz stats
var userAnswers = ["", "", "", "", ""];
var quizAnswers = [ "D", "A", "C", "B", "C"];
var hasSubmitted = false;

// timer
var timeRemaining = 30;
var intervalId; // variable to store setInterval
var isCounting = false; // variable to signal if timer is running
var countdownAudio = $("#countdown-audio")[0];


// FUNCTIONS
// ========================================================================================
// this function runs whenever the timer is started (whenever startTimer() executes)
function count() {

	// decrement timeRemaining by 1
	timeRemaining--;

	// display timeRemaining on HTML
	$("#time-remaining").html(timeRemaining);

	// if time runs out before user finishes/submits answers
	if (timeRemaining === 0 && !hasSubmitted) {

		// reset these variables on each click so they don't keep aggregating each time the time runs out
		correct = 0;
		incorrect = 0;
		unanswered = 0;

		// stop timer
		stopTimer();

		// alert loss
		alert("Time's up!");

		// compare user answers with correct answers 
		compareAnswers();

		// display the results of the quiz
		displayResults();

		// console insight
		hasSubmitted = false;
		console.log("================================");
		console.log(userAnswers);
		console.log(quizAnswers);
		console.log("Timer is running: " + isCounting);
		console.log("User has submitted answers: " + hasSubmitted);
	}

}

function startTimer() {
	intervalId = setInterval(count, 1000);
	isCounting = true;

	// play countdown audio
	countdownAudio.load();
	countdownAudio.play();

	// show audio icon
	$("i").css("display", "unset");
}

function stopTimer() {
	clearInterval(intervalId);
	isCounting = false;

	// stop countdown audio
	countdownAudio.pause();

	// hide audio icon
	$("i").css("display", "none");
}

// compare user's answers with the correct answers
function compareAnswers() {

	// loop through userAnswers array & compare answer at each index to quizAnswers array
	for (var i = 0; i < userAnswers.length; i++) {
		if (userAnswers[i] === "") {
			unanswered++;
		}
		else if (userAnswers[i] === quizAnswers[i]) {
			correct++;
		}
		else {
			incorrect++;
		}
	}

}

// enact results page
function displayResults() {

	// hide quiz page
	$("#quiz-div").css("display", "none");

	// update results
	$("#results").html(
		"You have " + unanswered + " unanswered question(s).<br />" +
		"You got " + correct + " out of 5 questions correct!<br />" +
		"You got " + incorrect + " out of 5 questions incorrect!"
	);

	// display results page
	$("#results-div").css("display", "unset");

}

// when user clicks on the done button, this function will execute
function submitted() {

	// prevent form from automatically refreshing upon submit
	event.preventDefault();

	// reset these variables on each click so they don't keep aggregating if
	// the user decides to click the button multiple times
	correct = 0;
	incorrect = 0;
	unanswered = 0;

	// stop timer
	stopTimer();

	// compare answers & update stats
	compareAnswers();
	
	// display results page
	displayResults();

	// console insight
	hasSubmitted = true;
	console.log("================================");
	console.log(userAnswers);
	console.log(quizAnswers);
	console.log("Timer is running: " + isCounting);
	console.log("User has submitted answers: " + hasSubmitted);

}

// initialize/show quiz each time user starts game
function initGame() {
	
	// hide welcome page
	$("#welcome-div").css("display", "none");
	$("#start").css("display", "none");

	// display quiz page
	$("#timer").css("display", "unset");
	$("#divider").css("visibility", "visible");
	$("#quiz-div").css("display", "unset");
	$(".jumbotron").css("padding-bottom", "70px");

	// console insight
	console.log("================================");
	console.log("Timer is running: " + isCounting);
	console.log("User has submitted answers: " + hasSubmitted);
	console.log("================================");

}

// reset the form & reenact landing page
function resetGame() {

	// reset form
	$("#quiz-form")[0].reset();
	hasSubmitted = false;
	// reset user's answers
	userAnswers = ["", "", "", "", ""];

	// hide results page
	$("#results-div").css("display", "none");
	$("#divider").css("visibility", "hidden");
	$("#timer").css("display", "none");

	// reset timer display to initial time
	$("#time-remaining").html("30");
	// reset timer to initial time
	timeRemaining = 30;

	// display welcome page
	$("#welcome-div").css("display", "unset");
	$("#start").css("display", "unset");

}


// MAIN PROCESS
// ========================================================================================
$(window).on("load", function() {

	// when user clicks start, initialize game display & start countdown!
	$("#start").on("click", function() {
		startTimer();
		initGame();
	});
	// // timer toggle (pause button is commented out on HTML)
	// $("#pause").on("click", function() {
	// 	clearInterval(intervalId);
	// 	isCounting = false;
	// });

	// reset game when user clicks reset
	$("#reset").on("click", function() {
		resetGame();
	});

	// whenever the user makes any change to the radio buttons for question 1
	$(document).on("change", "input[name='question1']", function() {
	/* 
	making var question1 = "input[name='question1']";
	and typing $(document).on("change", question1, function() {}); here doesn't work because
	the document onchange function is asynchronous
	so it runs even before var question1 has been defined, making question1 show up as undefined
	EDIT: actually it does work if i define the variable within the window.onload function
	*/
		// change the empty string at the appropriate userAnswers index to the value of
		// whichever radio button the user selected
		userAnswers[0] = this.value;
		console.log("Question 1: " + userAnswers[0]);
	});
	$(document).on("change", "input[name='question2']", function() {
		userAnswers[1] = this.value;
		console.log("Question 2: " + userAnswers[1]);
	});
	$(document).on("change", "input[name='question3']", function() {
		userAnswers[2] = this.value;
		console.log("Question 3: " + userAnswers[2]);
	});
	$(document).on("change", "input[name='question4']", function() {
		userAnswers[3] = this.value;
		console.log("Question 4: " + userAnswers[3]);
	});
	$(document).on("change", "input[name='question5']", function() {
		userAnswers[4] = this.value;
		console.log("Question 5: " + userAnswers[4]);
	});

});