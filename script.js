'use strict';

const score1El = document.getElementById('score--0');
const score2El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const palyer0El = document.querySelector('.player--0');
const palyer1El = document.querySelector('.player--1');
const newGame = document.querySelector('.btn--new');
const clickMe = document.querySelector('.play-me');
const showModal = document.querySelector('.btn--new-file');
const closeview = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');

// Starting Condition
score1El.textContent = 0;
score2El.textContent = 0;
diceEl.classList.add('hidden');

const score = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// Rolling dice functionailty

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  palyer0El.classList.toggle('player--active');
  palyer1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    diceEl.src = `dice-${dice}.png`;

    diceEl.classList.remove('hidden');
    if (dice !== 1) {
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += currentScore;
    // score[1] = score[1] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= 50) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //   Switch to the next player
      switchPlayer();
    }
  }
});

const reset = function () {
  palyer0El.value = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  score1El.textContent = 0;
  score2El.textContent = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  diceEl.classList.add('hidden');
};

newGame.addEventListener('click', function () {
  reset();
});

clickMe.addEventListener('click', function () {
  showModal.classList.add('add');
  showModal.classList.remove('hidden');
});

const closeModal = function () {
  showModal.classList.add('hidden');
  showModal.classList.remove('add');
  overlay.classList.add('hidden');
};

closeview.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});
