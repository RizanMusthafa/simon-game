const gameBoard = document.getElementById("game-board");
const green = document.getElementById("green");
const red = document.getElementById("red");
const blue = document.getElementById("blue");
const yellow = document.getElementById("yellow");
const lightNodeList = document.querySelectorAll(".light");

const lightList = [green, red, blue, yellow];

patterns = [];

function addToPatterns() {
  const lightNo = Math.floor(Math.random() * 4);
  const light = lightList[lightNo];
  patterns.push(light);
}

function lightBulb(elId) {
  el = patterns[elId];
  if (el != undefined) {
    el.classList.add("active");
    gameBoard.classList.add("active");
    setTimeout(() => {
      el.classList.remove("active");
      gameBoard.classList.remove("active");
      setTimeout(() => lightBulb(++elId), 500);
    }, 1000);
  }
}

lightList.forEach(el => {
  el.addEventListener("click", e => {
    if (gameBoard.classList.contains("active")) return;
    el.classList.add("active");
    gameBoard.classList.add("active");
    setTimeout(() => {
      el.classList.remove("active");
      gameBoard.classList.remove("active");
    }, 1000);
  });
});

addToPatterns();
addToPatterns();
lightBulb(0);
