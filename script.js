'use strict';
//selecting elements
const player0el = document.querySelector('.player--0');
const player1el = document.querySelector('.player--1');
const score0el = document.querySelector('#score--0');
const score1el = document.getElementById('score--1');
const current0el = document.getElementById('current--0');
const current1el = document.getElementById('current--1');
const diceel = document.querySelector('.dice');
const btnnew = document.querySelector('.btn--new');
const btnroll = document.querySelector('.btn--roll');
const btnhold = document.querySelector('.btn--hold');
let scores, currentscore, activeplayer, playing;
//starting conditions

const switchplayer = function () {
  document.getElementById(`current--${activeplayer}`).textContent = 0;
  activeplayer = activeplayer === 0 ? 1 : 0;
  currentscore = 0;
  player0el.classList.toggle('player--active');
  player1el.classList.toggle('player--active');
};
const init = function () {
  score0el.textContent = 0;
  score1el.textContent = 0;
  current0el.textContent = 0;
  current1el.textContent = 0;
  player0el.classList.remove('player--winner');
  player1el.classList.remove('player--winner');
  player0el.classList.add('player--active');
  player1el.classList.remove('player--active');
  diceel.classList.add('hidden');
  scores = [0, 0];
  currentscore = 0;
  activeplayer = 0;
  playing = true;
};
init();
diceel.classList.add('hidden');
//rolling dice functionality
btnroll.addEventListener('click', function () {
  if (playing) {
    //1. generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. display dice
    diceel.classList.remove('hidden');
    diceel.src = `dice-${dice}.png`;
    //3. check for rolled 1
    if (dice != 1) {
      //Add dice to current score
      currentscore += dice;
      document.getElementById(`current--${activeplayer}`).textContent =
        currentscore;
      current0el.textContent = currentscore;
    } else {
      //Switch to next player
      switchplayer();
    }
  }
});

btnhold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to active player's score
    scores[activeplayer] += currentscore;
    document.getElementById(`score--${activeplayer}`).textContent =
      scores[activeplayer];
    //2. Check if player score>=100
    if (scores[activeplayer] >= 10) {
      //Finish game
      playing = false;
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove('player--active');
      diceel.classList.add('hidden');
    } else {
      //Switch to the next player
      switchplayer();
    }
  }
});

btnnew.addEventListener('click', init);
