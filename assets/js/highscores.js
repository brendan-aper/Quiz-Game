var highscoreTable = document.getElementById("highscore-table");
var highscoreList = document.getElementById("highscore-list");

displayHighscores();

function displayHighscores() {
  var highscores = JSON.parse(localStorage.getItem("highscores")) || [];

  highscoreList.innerHTML = ""; // Clear the highscore list

  // Sort highscores in descending order by score
  highscores.sort(function (a, b) {
    return b.score - a.score;
  });

  // Display up to 10 scores
  var displayCount = Math.min(highscores.length, 10);
  for (var i = 0; i < displayCount; i++) {
    var highscore = highscores[i];
    var row = document.createElement("tr");
    var initialsCell = document.createElement("td");
    var scoreCell = document.createElement("td");

    initialsCell.textContent = highscore.initials;
    scoreCell.textContent = highscore.score;

    row.appendChild(initialsCell);
    row.appendChild(scoreCell);
    highscoreList.appendChild(row);
  }
}