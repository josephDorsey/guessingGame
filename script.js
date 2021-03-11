'use strict';
/*
console.log(document.querySelector('.message').textContent);
console.log(
  (document.querySelector('.message').textContent = `🎉 Correct Number!`)
);
document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);
*/
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};
const displayNumber = function (number) {
  document.querySelector('.number').textContent = number;
};

const displayScore = function (score) {
  document.querySelector('.score').textContent = score;
};

const numberStyle = function (style) {
  document.querySelector('.number').style.width = style;
};

const bodyStyle = function (bodyStyle) {
  document.querySelector('body').style.backgroundColor = bodyStyle;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);
  //When there is no input
  if (!guess) {
    // document.querySelector('.message').textContent = 'No number ⛔️';
    displayMessage('No number ⛔️');
    //When the user Wins
  } else if (guess === secretNumber) {
    // document.querySelector('.message').textContent = `Correct Number! 🎉 `;
    displayMessage(`Correct Number! 🎉 `);
    // document.querySelector('.number').textContent = secretNumber;
    displayNumber(secretNumber);
    // document.querySelector('body').style.backgroundColor = '#60b347';
    bodyStyle('#60b347');
    // document.querySelector('.number').style.width = '30rem';
    numberStyle('30rem');

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
    //When the guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      //   document.querySelector('.message').textContent =
      //     guess > secretNumber ? 'too high ⬆' : 'too low ⬇';
      displayMessage(guess > secretNumber ? 'too high ⬆' : 'too low ⬇');
      score--;
      //   document.querySelector('.score').textContent = score;
      displayScore(score);
    } else {
      //   document.querySelector('.message').textContent = 'YOU LOST THE GAME! 😵';
      displayMessage('YOU LOST THE GAME! 😵');
      //   document.querySelector('.score').textContent = 0;
      displayScore(0);
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  displayMessage('Start guessing...');
  //   document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.guess').value = '';
  //   document.querySelector('.score').textContent = score;
  displayScore(score);
  //   document.querySelector('body').style.backgroundColor = '#222';
  bodyStyle('#222');
  //   document.querySelector('.number').style.width = '15rem';
  numberStyle('15rem');
  //   document.querySelector('.number').textContent = '?';
  displayNumber('?');
});
