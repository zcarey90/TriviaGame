var triviaQuestions = [
  {
    question: "In what year did the show Game of Thrones start?",
    answerList: ["1984", "2011", "1993", "1999"],
    answer: 1
  },
  {
    question: "Who died at the end of season 1?",
    answerList: [
      "The Mountain",
      "Lord Eddard Stark",
      "Wayne and Garth",
      "Jamie Lannister"
    ],
    answer: 1
  },
  {
    question: "What company produces and creates GOT?",
    answerList: ["Zuffa", "Warner Bros", "Exxon", "Microsoft"],
    answer: 1
  },
  {
    question: "Who created Game of Thrones?",
    answerList: [
      "Metallica,",
      "George R.R. Martin",
      "J.R. Tolkien",
      "J.K. Rowling"
    ],
    answer: 1
  },
  {
    question: "How many seasons of Game of Thrones are there?",
    answerList: ["5", "7", "8", "6"],
    answer: 2
  },
  {
    question: "Who is the true heir to the Iron Throne?",
    answerList: ["Khaleesi", "Jon Snow", "The Mountain", "Reek"],
    answer: 1
  },
  {
    question: "Who has won the most awards for acting on GOT?",
    answerList: ["Kit Harrington", "Emilia Clarke", "Reek", "Peter Dinklage"],
    answer: 3
  }
];

var gifArray = [
  "question1",
  "question2",
  "question3",
  "question4",
  "question5",
  "question6",
  "question7"
];
var latestQuestion;
var correctAnswer;
var incorrectAnswer;
var unanswered;
var seconds;
var answered;
var userSelect;
var messages = {
  right: "Yes, that is right",
  wrong: "Sorry the answer you selected is wrong.",
  endTime: "You have run out of time",
  completed: "Lets check and see how you did."
};

$("#startBtn").on("click", function() {
  $(this).hide();
  newGame();
});

$("#startOverBtn").on("click", function() {
  $(this).hide();
  newGame();
});

function newGame() {
  $("#lastMessage").empty();
  $("#rightAnswers").empty();
  $("#wrongAnswers").empty();
  $("#notAnswered").empty();
  currentQuestion = 0;
  correctAnswer = 0;
  incorrectAnswer = 0;
  unanswered = 0;
  newQuestion();
}

function newQuestion() {
  $("#message").empty();
  $("#correctedAnswer").empty();
  $(".answers").empty();
  $("#gif").empty();
  answered = true;

  $("#latestQuestion").html(
    "Question #" + (latestQuestion + 1) + "/" + triviaQuestions.length
  );
  $(".question").html(
    "<h2>" + triviaQuestions[currentQuestion].question + "</h2>"
  );
  for (var i = 0; i < triviaQuestions[currentQuestion].answerList.length; i++) {
    var choices = $("<button>");
    choices.text(triviaQuestions[currentQuestion].answerList[i]);
    choices.attr({ "data-index": i });
    choices.addClass("thisChoice");
    $(".answers").append(choices);
  }
  countdown("Time Remaining", "not-answered");

  $(".thisChoice").on("click", function() {
    userSelect = $(this).data("index");
    clearInterval(time);
    answerPage();
  });
}

function countdown(title, type) {
  seconds = 7;
  $("#timeLeft").html("<h3>" + title + ": " + seconds + "</h3>");
  answered = true;

  time = setInterval(function() {
    showCountdown(title, type);
  }, 1000);
}

function showCountdown(title, type) {
  seconds--;
  $("#timeLeft").html("<h3>" + title + ": " + seconds + "</h3>");
  if (seconds < 1) {
    clearInterval(time);

    if (type === "not-answered") {
      answered = false;
      answerPage();
    } else {
      newQuestion();
    }
  }
}

function answerPage() {
  $("#currentQuestion").empty();
  $(".thisChoice").empty();
  $(".question").empty();
  $(".answers").empty();

  var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
  var rightAnswerText =
    triviaQuestions[currentQuestion].answerList[rightAnswerIndex];
  $("#gif").html(
    '<img src="assets/images/' +
      gifArray[currentQuestion] +
      '.gif" style="width: 100%; margin: 0 auto;">'
  );

  if (userSelect == rightAnswerIndex && answered == true) {
    correctAnswer++;
    $("#message").html(messages.right);
  } else if (userSelect != rightAnswerIndex && answered == true) {
    incorrectAnswer++;
    $("#message").html(messages.wrong);
    $("#correctedAnswer").html("The correct answer was: " + rightAnswerText);
  } else {
    unanswered++;
    $("#message").html(messages.endTime);
    $("#correctedAnswer").html("The correct answer was: " + rightAnswerText);
    answered = true;
  }

  if (currentQuestion == triviaQuestions.length - 1) {
    setTimeout(score, 7000);
  } else {
    currentQuestion++;
    countdown("Time till Next Question");
  }
}

function score() {
  $("#timeLeft").empty();
  $("#message").empty();
  $("#correctedAnswer").empty();
  $("#gif").empty();

  $("#lastMessage").html(messages.finished);
  $("#rightAnswers").html("Correct Answers: " + correctAnswer);
  $("#wrongAnswers").html("Incorrect Answers: " + incorrectAnswer);
  $("#notAnswered").html("Unanswered: " + unanswered);
  $("#startOverBtn").addClass("reset");
  $("#startOverBtn").show();
  $("#startOverBtn").html("Start Over???");
}
