// Define your questions and answers
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
      question: "A very useful tool used during development and debugging for printing content to the debugger is?",
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
  
  var startScreen = document.getElementById("start-screen");
  var startButton = document.getElementById("start-button");
  var quizScreen = document.getElementById("quiz-screen");
  var questionElement = document.getElementById("question");
  var choicesElement = document.getElementById("choices");
  var resultElement = document.getElementById("result");

  startButton.addEventListener("click", startQuiz);

  function startQuiz(){
    startScreen.style.display = "none";
    quizScreen.style.display = "block";
    displayQuestion();
  }
  
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
  
  function checkAnswer() {
    var selectedOption = parseInt(this.value);
    var question = questions[currentQuestion];
  
    if (selectedOption === question.correctAnswer) {
      score++;
      resultElement.textContent = "Correct!";
    } else {
      resultElement.textContent = "Wrong!";
    }
  
    currentQuestion++;
  
    if (currentQuestion < questions.length) {
      displayQuestion();
    } else {
      showScore();
    }
  }
  
  function showScore() {
    questionElement.textContent = "Quiz completed! Your score is " + score + " out of " + questions.length + ".";
    choicesElement.innerHTML = "";
    submitButton.style.display = "none";
    resultElement.textContent = "";
  }
  
//   displayQuestion();