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

// Initialize game
const initialPlayerScore0 = 0;
const initialPlayerScore1 = 0;
const initialCurrentScore0 = 0;
const initialCurrentScore1 = 0;
let currentScore0 = 0;
let currentScore1 = 0;
let playerScore0 = 0;
let playerScore1 = 0;
let number = 0;

dice.classList.add("hidden");

//Tire un nouveau dé aléatoire et l'affiche
const randomDice = () => {
  let random = Math.floor(Math.random() * 6 + 1);
  dice.classList.remove("hidden");
  dice.setAttribute("src", `./images/dice-${random}.png`);
  number = random;
};

// Ajoute le dé au score de la manche si ce n'est pas un 1.
const addDiceAtCurrentScore = () => {
  if (number !== 1) {
    if (playerSection0El.classList.contains("player--active")) {
      currentScore0 += number;
      currentScore0El.textContent = currentScore0;
    } else {
      currentScore1 += number;
      currentScore1El.textContent = currentScore1;
    }
  }
};

// Le joueur perd son score de la manche
const lostCurrentScore = () => {
  number = 0;
  if (playerSection0El.classList.contains("player--active")) {
    currentScore0El.textContent = number;
  } else {
    currentScore1El.textContent = number;
  }
};

// changer le player actif
const changePlayer = () => {
  if (playerSection0El.classList.contains("player--active")) {
    playerSection0El.classList.remove("player--active");
    playerSection1El.classList.add("player--active");
    currentScore0 = initialCurrentScore0;
    currentScore0El.textContent = currentScore0;
  } else {
    playerSection1El.classList.remove("player--active");
    playerSection0El.classList.add("player--active");
    currentScore1 = initialCurrentScore1;
    currentScore1El.textContent = currentScore1;
  }
};

// fin de partie
const gameOver = () => {
  rollBtn.disabled = true;
  holdBtn.disabled = true;
};

const onClickRollButton = () => {
  randomDice();
  addDiceAtCurrentScore();
  if (number === 1) {
    lostCurrentScore();
    changePlayer();
  }
};

const onClickHoldButton = () => {
  if (playerSection0El.classList.contains("player--active")) {
    playerScore0 += currentScore0;
    playerScore0El.textContent = playerScore0;
    if (playerScore0 >= 100) {
      playerScore0 = 100;
      playerScore0El.textContent = playerScore0;
      playerSection0El.classList.remove("player--active");
      playerSection0El.classList.add("player--winner");
      gameOver();
    }
  } else {
    playerScore1 += currentScore1;
    playerScore1El.textContent = playerScore1;
    if (playerScore1 >= 100) {
      playerScore1 = 100;
      playerScore1El.textContent = playerScore1;
      playerSection0El.classList.remove("player--active");
      playerSection1El.classList.add("player--winner");
      gameOver();
    }
  }
  changePlayer();
};

const onClickNewButton = () => {
  currentScore0 = initialCurrentScore0;
  currentScore1 = initialCurrentScore1;
  playerScore0 = initialPlayerScore0;
  playerScore1 = initialPlayerScore1;
  playerScore0El.textContent = initialPlayerScore0;
  playerScore1El.textContent = initialPlayerScore1;
  currentScore0El.textContent = initialCurrentScore0;
  currentScore1El.textContent = initialCurrentScore1;
  playerSection0El.classList.remove("player--winner");
  playerSection1El.classList.remove("player--winner");
  playerSection0El.classList.add("player--active");
  rollBtn.disabled = false;
  holdBtn.disabled = false;
};

rollBtn.addEventListener("click", onClickRollButton);
holdBtn.addEventListener("click", onClickHoldButton);
newBtn.addEventListener("click", onClickNewButton);
