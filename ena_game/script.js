const gaugeCursor = document.getElementById("gaugeCursor");
const resultText = document.getElementById("resultText");
const character = document.getElementById("character");
const scoreText = document.getElementById("score");
const roundText = document.getElementById("round");
const startButton = document.getElementById("startButton");

const gaugeWidth = 700;
const cursorWidth = 20;

const perfectCenter = gaugeWidth / 2;

const soundToggleButton =
  document.getElementById("soundToggleButton");

const soundPanel =
  document.getElementById("soundPanel");



let position = 0;
let direction = 1;
let speed = 7;

let animationId = null;

let isPlaying = false;

let score = 0;
let round = 1;

let bgmVolume = 0.5;
let seVolume = 0.7;

const bgm = new Audio("assets/audio/bgm.mp3");
const perfectSe = new Audio("assets/audio/perfect.mp3");
const hitSe = new Audio("assets/audio/hit.mp3");
const missSe = new Audio("assets/audio/miss.mp3");

bgm.volume = bgmVolume;

perfectSe.volume = seVolume;
hitSe.volume = seVolume;
missSe.volume = seVolume;



const bgmVolumeSlider =
  document.getElementById("bgmVolume");

const seVolumeSlider =
  document.getElementById("seVolume");

bgm.loop = true;




function startGame() {

  if (isPlaying) {
    return;
  }

  isPlaying = true;

  bgm.play();

  resultText.textContent = "PRESS SPACE";

  updateGauge();
}

function updateGauge() {

  position += speed * direction;

  if (position >= gaugeWidth - cursorWidth) {
    direction = -1;
  }

  if (position <= 0) {
    direction = 1;
  }

  gaugeCursor.style.left = position + "px";

  animationId = requestAnimationFrame(updateGauge);
}

function stopGauge() {

  if (!isPlaying) {
    return;
  }

  cancelAnimationFrame(animationId);

  isPlaying = false;

  judge();
}

function judge() {

  const cursorCenter = position + cursorWidth / 2;

  const distance = Math.abs(cursorCenter - perfectCenter);

  let result = "";

  resultText.className = "";

  if (distance < 20) {

    result = "PERFECT";

    resultText.classList.add("perfect");

    score += 100;

    perfectSe.play();

    changeCharacter("happy");

  } else if (distance < 60) {

    result = "GOOD";

    resultText.classList.add("good");

    score += 50;

    hitSe.play();

    changeCharacter("happy");

  } else {

    result = "MISS";

    resultText.classList.add("miss");

    missSe.play();

    changeCharacter("sad");
  }

  resultText.textContent = result;

  scoreText.textContent = `SCORE : ${score}`;

  round++;

  roundText.textContent = `ROUND : ${round}`;

  speed += 0.5;

  setTimeout(() => {

    resultText.className = "";

    resultText.textContent = "PRESS SPACE";

    resetRound();

  }, 1500);
}

function resetRound() {

  position = 0;

  direction = 1;

  gaugeCursor.style.left = "0px";

  isPlaying = true;

  updateGauge();
}

function changeCharacter(type) {

  if (type === "happy") {

    character.src = "assets/img/happy.png";

    character.style.transform = "scale(1.15)";

  } else {

    character.src = "assets/img/sad.png";

    character.style.transform = "scale(0.9)";
  }

  setTimeout(() => {

    character.src = "assets/img/normal.png";

    character.style.transform = "scale(1)";

  }, 1000);
}

document.addEventListener("keydown", (e) => {

    if (e.code === "Enter") {

        beginGame();
    }

    if (e.code === "Space") {

        handleAction();
    }
});

bgmVolumeSlider.addEventListener("input", (e) => {

  bgmVolume = Number(e.target.value);

  bgm.volume = bgmVolume;
});

seVolumeSlider.addEventListener("input", (e) => {

  seVolume = Number(e.target.value);

  perfectSe.volume = seVolume;
  hitSe.volume = seVolume;
  missSe.volume = seVolume;
});

soundToggleButton.addEventListener("click", () => {

  soundPanel.classList.toggle("hidden");
});

function beginGame() {

    if (startButton.style.display !== "none") {

        startButton.style.display = "none";

        startGame();
    }
}

function handleAction() {

    if (!isPlaying) {
        return;
    }

    stopGauge();
}

startButton.addEventListener("click", () => {

    beginGame();
});

document.addEventListener("click", (e) => {

    if (e.target.id === "soundToggleButton") {
        return;
    }

    if (e.target.id === "bgmVolume") {
        return;
    }

    if (e.target.id === "seVolume") {
        return;
    }

    if (startButton.style.display !== "none") {

        beginGame();

    } else {

        handleAction();
    }
});
document.addEventListener("touchstart", (e) => {

    if (e.target.id === "soundToggleButton") {
        return;
    }

    if (e.target.id === "bgmVolume") {
        return;
    }

    if (e.target.id === "seVolume") {
        return;
    }

    if (startButton.style.display !== "none") {

        beginGame();

    } else {

        handleAction();
    }
});