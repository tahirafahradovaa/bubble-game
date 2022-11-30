const startScreen = document.querySelector(".container-start");
const playScreen = document.querySelector(".container-play");
const nameBtn = document.querySelector("#name");
const nameInput = document.querySelector("#nameInput");
const playerName = document.querySelector(".player-name");
const playerScore = document.querySelector(".player-score");
const playerHigh = document.querySelector(".player-high-score");
const startBtn = document.querySelector(".start");
const stopBtn = document.querySelector(".stop");
const playDisplay = document.querySelector(".play-area");
const easyBtn = document.querySelector(".easy");
const mediumBtn = document.querySelector(".medium");
const hardBtn = document.querySelector(".hard");
const audio = new Audio("pop-91931.mp3");
let buttonNum = 0;
let score = 0;
let scoreArr = [];

const gameOver = function () {
  easyBtn.disabled = true;
  mediumBtn.disabled = true;
  hardBtn.disabled = true;
  stopBtn.disabled = true;
};
const noMore = function () {
  easyBtn.disabled = true;
  mediumBtn.disabled = true;
  hardBtn.disabled = true;
};
function generateButton(interval, point) {
  let myInterval = setInterval(() => {
    if (buttonNum === 50) {
      return;
    } else {
      let randomA = Math.floor(Math.random() * 330);
      let randomB = Math.floor(Math.random() * 400);
      let btn = document.createElement("button");
      playDisplay.appendChild(btn);
      let top = 0;
      let left = 0;
      btn.style.width = "20px";
      btn.style.position = "absolute";
      btn.classList.add("pop");
      btn.style.height = "20px";
      btn.style.borderRadius = "50%";
      btn.style.backgroundColor = "tomato";
      btn.style.left = left + randomA + "px";
      btn.style.top = top + randomB + "px";
      btn.style.border = "none";
      buttonNum += 1;
      btn.addEventListener("click", () => {
        audio.play();
        btn.style.display = "none";
        buttonNum -= 1;
        score += point;
        playerScore.innerText = score;
        scoreArr.push(score);
        const sorted = scoreArr.sort((a, b) => b.scoreArr - a.scoreArr);
        if (localStorage.getItem("high") < sorted[sorted.length - 1]) {
          localStorage.setItem("high", sorted[sorted.length - 1]);
        }
      });
      stopBtn.addEventListener("click", () => {
        score = 0;
        playerScore.innerText = 0;
        const buttons = document.querySelectorAll(".pop");
        buttons.forEach((element) => {
          element.style.display = "none";
          clearInterval(myInterval);
          playerHigh.innerText = localStorage.getItem("high");
          gameOver();
        });
      });
    }
  }, interval);
}
function toggled() {
  startScreen.classList.toggle("disable");
}
nameBtn.addEventListener("click", function () {
  if (!nameInput.value) {
    alert("pls enter a name");
  } else {
    playerName.innerText = nameInput.value.toUpperCase();
    startScreen.classList.toggle("disable");
    playScreen.classList.remove("disable");
    playerHigh.innerText = localStorage.getItem("high");
  }
});
startBtn.addEventListener("click", () => {
  easyBtn.disabled = false;
  mediumBtn.disabled = false;
  hardBtn.disabled = false;
  stopBtn.disabled = false;
});
easyBtn.addEventListener("click", function () {
  generateButton(2000, 1);
  noMore();
});
mediumBtn.addEventListener("click", function () {
  generateButton(1000, 3);
  noMore();
});
hardBtn.addEventListener("click", function () {
  generateButton(500, 5);
  noMore();
});
