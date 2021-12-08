/* eslint-disable require-jsdoc */
// scores and colours of the diamonds in their respective order
let scores = [0, 0, 0, 0];
const template = document.createElement('template');
template.innerHTML = `
  <style>
  .diamond {
		width: 30px;
    height: 30px;
    margin-top:15px;
    transform: rotate(45deg);
    left:12px;
    position:relative;
    border: 1px;
    border-style:solid;
	}
  </style>
  <div class="diamond">
  </div>
`;

// Assigns functions to clickable elements
const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', resetPoints);
const scoreBoardScores = document.getElementsByClassName('scores');
const diamondButtons = document.getElementsByTagName('custom-diamond');

// Diamond class for creating diamonds objects in html. 
class Diamond extends HTMLElement {
  constructor() {
      super();
      this.showInfo = true;
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.shadowRoot.querySelector('div').style.background = this.getAttribute('color')
  }
  newPos(pos) {
    this.shadowRoot.querySelector('div').style.left = `${(pos)*59+12}px`
  }
  resetPos() {
    this.shadowRoot.querySelector('div').style.left = '12px'
  }
}

customElements.define('custom-diamond', Diamond);

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
    evt.currentTarget.newPos(scores[evt.currentTarget.pos])
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
    diamondButtons[i].resetPos();
    scoreBoardScores[i].style.color = 'black';
  }
  updateHTMLScores();
};

// Waits for the window to load before creating diamonds and assigning scripts
window.onload = function() {
  assignPointFunctionToDiamonds();
};


