const gameBoard = document.getElementById("game-board");
const green = document.getElementById("green");
const red = document.getElementById("red");
const blue = document.getElementById("blue");
const yellow = document.getElementById("yellow");
const lightNodeList = document.querySelectorAll(".light");
const startBtn = document.getElementById("start-btn");
const scoreDisplay = document.getElementById("score-display");

let strickMod = false;

let isPlaying = false;
let gameStarted = false;
let gameTurn = 0;
let score = 0;

const lightList = [green, red, blue, yellow];

let patterns = [];

function addToPatterns() {
  displayScore();
  const lightNo = Math.floor(Math.random() * 4);
  const light = lightList[lightNo];
  patterns.push(light);
}

function displayScore() {
  let scoreStr = `${score}`;
  if (scoreStr.length === 1) scoreStr = `0${score}`;
  scoreDisplay.textContent = scoreStr;
}

function lightBulb(elId) {
  el = patterns[elId];
  if (el !== undefined) {
    isPlaying = true;
    el.classList.add("active");
    gameBoard.classList.add("active");
    setTimeout(() => {
      el.classList.remove("active");
      gameBoard.classList.remove("active");
      setTimeout(() => lightBulb(++elId), 500);
    }, 1000);
  } else {
    isPlaying = false;
  }
}

function gameOver() {
  if (strickMod) {
    scoreDisplay.innerHTML = "<small style='font-size:18px;'>Game over<small>";
    // setTimeout(() => displayScore(), 600);
    resetGame();
    gameStarted = true;
    addToPatterns();
    isPlaying = true;
    setTimeout(() => lightBulb(0), 700);
  } else {
    scoreDisplay.textContent = "!!";
    setTimeout(() => displayScore(), 600);
    gameTurn = 0;
    setTimeout(() => lightBulb(0), 700);
  }
}

function resetGame() {
  isPlaying = false;
  gameStarted = false;
  gameTurn = 0;
  score = 0;
  patterns = [];
}

lightList.forEach(el => {
  el.addEventListener("mousedown", e => {
    if (!isPlaying) el.classList.add("active");
  });
});

lightList.forEach(el => {
  el.addEventListener("mouseup", e => {
    if (isPlaying) return;
    ++gameTurn;
    el.classList.remove("active");
    if (patterns[gameTurn - 1].id === el.id) {
      if (patterns.length === gameTurn) {
        score++;
        addToPatterns();
        setTimeout(() => lightBulb(0), 700);
        gameTurn = 0;
      }
    } else {
      gameOver();
    }
  });
});

startBtn.addEventListener("click", e => {
  if (gameStarted) return;
  gameStarted = true;
  console.log("clecked");
  addToPatterns();
  lightBulb(0);
});
