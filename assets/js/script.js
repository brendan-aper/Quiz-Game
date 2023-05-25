// Defining questions and answers
var questions = [
  {
    question: "Commonly used data types DO NOT include?",
    choices: ["strings", "Booleans", "Alerts", "Numbers"],
    correctAnswer: 2
  },
  {
    question: "The condition in an if/else statement is enclosed with?",
    choices: ["Quotes", "Curly Brackets", "Parantheses", "Square Brackets"],
    correctAnswer: 2
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is?",
    choices: ["JavaScript", "Terminal/Bash", "For Loops", "console.log"],
    correctAnswer: 3
  },
  {
    question: "String values must be enclosed within __ when being assigned to variables.",
    choices: ["Commas", "Curly Brackets", "Quotes", "Parentheses"],
    correctAnswer: 2
  },
  {
    question: "Arrays in JavaScript can be used to store?",
    choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    correctAnswer: 3
  }
];

var currentQuestion = 0;
var score = 0;
var timeLeft = 60;
var timerInterval;
var initialsPrompted = false;

// Getting HTML elements
var startScreen = document.getElementById("start-screen");
var startButton = document.getElementById("start-button");
var quizScreen = document.getElementById("quiz-screen");
var questionElement = document.getElementById("question");
var choicesElement = document.getElementById("choices");
var timerElement = document.getElementById("time-left");
var timerDisplayEl = document.getElementById("timer");
var resultElement = document.getElementById("result");
var headerElement = document.getElementById("header");

// Start the quiz and hide the start screen display
function startQuiz() {
  startScreen.style.display = "none";
  headerElement.style.display = "none";
  quizScreen.style.display = "block";
  timerDisplayEl.style.display = "block";
  displayQuestion();
  startTimer();
}

// Timer function
function startTimer() {
  timerInterval = setInterval(function () {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0 || currentQuestion === questions.length) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}

// Display questions and answers
function displayQuestion() {
  var question = questions[currentQuestion];
  questionElement.textContent = question.question;

  choicesElement.innerHTML = "";
  for (var i = 0; i < question.choices.length; i++) {
    var choice = question.choices[i];
    var button = document.createElement("button");
    button.textContent = choice;
    button.value = i;
    button.addEventListener("click", checkAnswer);
    choicesElement.appendChild(button);
  }
}

// Check the selected answer
function checkAnswer() {
  var selectedOption = parseInt(this.value);
  var question = questions[currentQuestion];

  if (selectedOption === question.correctAnswer) {
    score++;
    resultElement.textContent = "Correct!";
  } else {
    resultElement.textContent = "Wrong!";
    timeLeft -= 15;
    if (timeLeft < 0) {
      timeLeft = 0;
    }
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}

// Prompt for initials and save the highscore
function endQuiz() {
  var finalScore = score * timeLeft; // Calculate the final score

  questionElement.textContent = "Quiz completed! Your score is " + finalScore + ".";
  choicesElement.innerHTML = "";
  resultElement.textContent = "";
  timerElement.textContent = "";

  if (!initialsPrompted) {
      initialsPrompted = true;
  
      // Prompt for initials
      var initials = prompt("Enter your initials (max 3 characters):");
      if (initials) {
        var highscore = {
          initials: initials.substring(0, 3),
          score: finalScore,
          timeLeft: timeLeft
        };
  
        // Retrieve existing highscores from local storage or initialize empty array
        var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  
        // Add the current highscore
        highscores.push(highscore);
  
        // Sort the highscores in descending order by score
        highscores.sort(function (a, b) {
          return b.score - a.score;
        });
  
        // Keep only the top 10 highscores
        highscores = highscores.slice(0, 10);
  
        // Save the updated highscores to local storage
        localStorage.setItem("highscores", JSON.stringify(highscores));
      }
    }
  
    // Display options to return to start screen or view highscores
    var optionsDiv = document.createElement("div");
    var returnButton = document.createElement("button");
    var highscoresLink = document.createElement("a");
  
    returnButton.textContent = "Return to Start Screen";
    highscoresLink.textContent = "View Highscores";
  
    returnButton.addEventListener("click", function () {
      startScreen.style.display = "block";
      headerElement.style.display = "block";
      quizScreen.style.display = "none";
      timerDisplayEl.style.display = "none";
    });
  
    highscoresLink.href = "./assets/html/highscores.html";
  
    optionsDiv.appendChild(returnButton);
    optionsDiv.appendChild(highscoresLink);
    resultElement.appendChild(optionsDiv);
  }
  
  startButton.addEventListener("click", startQuiz);