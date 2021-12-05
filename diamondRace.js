/* eslint-disable require-jsdoc */
// scores and colours of the diamonds in their respective order
let scores = [0, 0, 0, 0];
const colours = ['blue', 'green', 'red', 'yellow'];

// Assigns functions to clickable elements
const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', resetPoints);
const scoreBoardScores = document.getElementsByClassName('scores');
const diamondButtons = document.getElementsByClassName('diamond-shape');


// Creates the style for the diamonds
function createDiamonds() {
  for (i = 0; i < diamondButtons.length; i++) {
    diamondButtons[i].style.background = colours[i];
  }
}

// Assigns each diamond a function that increases their score when clicked upon
function assignPointFunctionToDiamonds() {
  for (i = 0; i < diamondButtons.length; i++) {
    diamondButtons[i].addEventListener('click', addPoint);
    diamondButtons[i].pos = i;
  }
}

// Adds point to a diamond when it is clicked and calls UpdateHTMLScore
function addPoint(evt) {
  if (Math.max(...scores) < 10) {
    scores[evt.currentTarget.pos] = scores[evt.currentTarget.pos] +1;
    newPos = scores[evt.currentTarget.pos] * 60;
    evt.currentTarget.style.left = newPos+'px';
    updateHTMLScores();
  }
}
// Uppdates the scores in the scoreboard
function updateHTMLScores() {
  for (i = 0; i < scoreBoardScores.length; i++) {
    scoreBoardScores[i].innerHTML = scores[i];
    if (scores[i] == 10) {
      scoreBoardScores[i].style.color = 'red';
    }
  }
}

// Sets all points to 0 and updates scoreboard
function resetPoints() {
  scores = [0, 0, 0, 0];
  for (i = 0; i < diamondButtons.length; i++) {
    diamondButtons[i].addEventListener('click', addPoint);
    diamondButtons[i].pos = i;
    diamondButtons[i].style.left = 13+'px';
    scoreBoardScores[i].style.color = 'black';
  }
  updateHTMLScores();
};

// Waits for the window to load before creating diamonds and assigning scripts
window.onload = function() {
  createDiamonds();
  assignPointFunctionToDiamonds();
};


