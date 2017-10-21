// Notes:
// 1) Get all of the code to work first, and then worry about optimizing
// 2) Use console.log & chrome inspector to debug and give you more information! It really does help
// 3) Not all stack overflow answers are necessarily correct. Test it out for yourself 
// // maybe on jsfiddle or jsbin before using


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


// FUNCTIONS
// ========================================================================================
	function count() {
		// decrement timeRemaining by 1
		timeRemaining--;

		// display timeRemaining on HTML
		$("#time-remaining").html(timeRemaining);

		// if time runs out before user finishes/submits answers
		if (timeRemaining === 0 && !hasSubmitted) {
			// stop timer
			stopTimer();

			// alert loss
			alert("Time's up!");

			// compare user answers with correct answers 
			compareAnswers();

			// display the results of the quiz
			displayResults();
		}
	}

	function startTimer() {
		intervalId = setInterval(count, 1000);
		isCounting = true;
	}

	function stopTimer() {
		clearInterval(intervalId);
		isCounting = false;
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

	function displayResults() {
		$("#quiz-div").css("display", "none");
		$("#results-div").css("display", "unset");
		$("#results").html(
			"You have " + unanswered + " unanswered question(s).<br />" +
			"You got " + correct + " out of 5 questions correct!<br />" +
			"You got " + incorrect + " out of 5 questions incorrect!"
		);
	}

	// when user clicks on the done button
	function submitted() {

		// prevent form from automatically refreshing upon submit
		event.preventDefault();

		// reset these variables on each click so that it doesn't keep aggregating if
		// the user keeps clicking the button multiple times
		correct = 0;
		incorrect = 0;
		unanswered = 0;

		// testing
		hasSubmitted = true;
		console.log(userAnswers);
		console.log(quizAnswers);
		console.log("User has submitted answers: " + hasSubmitted);

		// stop timer
		stopTimer();

		// compare answers
		compareAnswers();
		
		// display results
		displayResults();

	}


// MAIN PROCESS
// ========================================================================================
$(window).on("load", function() {

	// alert user to start timer/quiz
	alert("Welcome to Trivia Night!\nYou will be given 30 seconds to complete the quiz.\nWhen you're ready to play, press the start button.");

	// timer toggle
	$("#start").on("click", function() {
		$("#divider").css("visibility", "visible");
		$("#quiz-div").css("display", "unset");
		intervalId = setInterval(count, 1000);
		isCounting = true;
	});
	// $("#pause").on("click", function() {
	// 	clearInterval(intervalId);
	// 	isCounting = false;
	// });

	// reset button
	$("#reset").on("click", function() {
		$("#divider").css("visibility", "hidden");
		$("#quiz-form")[0].reset();
		$("#results-div").css("display", "none");
		$("#time-remaining").html("30");
		timeRemaining = 30;
	});

	// // start countdown immediately upon page load
	// startTimer();

	// whenever the user makes any change to the radio buttons for question 1
	$(document).on("change", "input[name='question1']", function() {
	/* 
	making var question1 = "input[name='question1']";
	and typing $(document).on("change", question1, function() {}); here doesn't work because
	the document onchange function is asynchronous
	so it runs even before var question1 has been defined, making question1 show up as undefined
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