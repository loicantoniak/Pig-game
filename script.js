"use strict";

// selecting elements
const playerScore0El = document.querySelector("#score--0");
const playerScore1El = document.querySelector("#score--1");
const currentScore0El = document.querySelector("#current--0");
const currentScore1El = document.querySelector("#current--1");
const playerSection0El = document.querySelector(".player--0");
const playerSection1El = document.querySelector(".player--1");

const dice = document.querySelector(".dice");
const rollBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");
const newBtn = document.querySelector(".btn--new");

let scores, currentScore, activePlayer, playing, number

// Initialize game
const init = () => {
  scores = [0 , 0]
  currentScore = 0
  activePlayer = 0
  playing = true

  playerScore0El.textContent = 0;
  playerScore1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  dice.classList.add('hidden');
  playerSection0El.classList.remove("player--winner");
  playerSection1El.classList.remove("player--winner");
  playerSection0El.classList.add("player--active");
}
init();

//Tire un nouveau dé aléatoire et l'affiche
const randomDice = () => {
  let random = Math.floor(Math.random() * 6 + 1);
  dice.classList.remove("hidden");
  dice.src =  `./images/dice-${random}.png`;
  number = random;
};

// Ajoute le dé au score de la manche si ce n'est pas un 1.
const addDiceAtCurrentScore = () => {

  if(number !== 1) {
    currentScore += number
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  }
  else {
    switchPlayer();
  }
};

// changer le player actif
const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0
  playerSection0El.classList.toggle("player--active")
  playerSection1El.classList.toggle("player--active")
};

const onClickRollButton = () => {
  if(playing) {
    randomDice();
    addDiceAtCurrentScore();
  }
};

const onClickHoldButton = () => {
  if(playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
    // 2. Check if player's score is >= 100 
    if(scores[activePlayer] >= 100) {
      playing = false;
      dice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

    }
    else {
      switchPlayer()
    }
  }
};

rollBtn.addEventListener("click", onClickRollButton);
holdBtn.addEventListener("click", onClickHoldButton);
newBtn.addEventListener("click", init);
