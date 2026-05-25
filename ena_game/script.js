const gaugeCursor = document.getElementById("gaugeCursor");
const resultText = document.getElementById("resultText");
const character = document.getElementById("character");
const scoreText = document.getElementById("score");
const roundText = document.getElementById("round");

const soundToggleButton =
  document.getElementById("soundToggleButton");

const soundPanel =
  document.getElementById("soundPanel");



let position = 0;
let direction = 1;
let speed = 1;

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

  resultText.textContent = "画面をタッチ";

  updateGauge();
}

function updateGauge() {

    position += speed * direction;

    if (position >= 100) {
        position = 100;
        direction = -1;
    }

    if (position <= 0) {
        position = 0;
        direction = 1;
    }

    gaugeCursor.style.left =
        position + "%";

    animationId =
        requestAnimationFrame(updateGauge);
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

    const distance =
        Math.abs(position - 50);

    let result = "";

    resultText.className = "";

    if (distance < 2) {

        result = "すごい！";

        resultText.classList.add("perfect");

        score += 100;

        perfectSe.currentTime = 0;
        perfectSe.play();

        changeCharacter("happy");

    } else if (distance < 10) {

        result = "いいね！";

        resultText.classList.add("good");

        score += 50;

        hitSe.currentTime = 0;
        hitSe.play();

        changeCharacter("happy");

    } else {

        result = "ざんねん";

        resultText.classList.add("miss");

        missSe.currentTime = 0;
        missSe.play();

        changeCharacter("sad");
    }

    resultText.textContent = result;

    scoreText.textContent =
        `SCORE : ${score}`;

    round++;

    roundText.textContent =
        `ROUND : ${round}`;

    speed += 0.06;

    setTimeout(() => {

        resultText.className = "";

        resultText.textContent =
            "タッチ";

        resetRound();

    }, 1500);
}

function resetRound() {

  position = 0;

  direction = 1;

  gaugeCursor.style.left = "0%";

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

    if (e.code === "Space") {
        e.preventDefault();
    }

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

    if (!isPlaying && round === 1 && score === 0) {

        startGame();
    }
}

function handleAction() {

    if (!isPlaying) {
        return;
    }

    stopGauge();
}

document.addEventListener("pointerdown", (e) => {

    if (e.target.id === "soundToggleButton") {
        return;
    }

    if (e.target.id === "bgmVolume") {
        return;
    }

    if (e.target.id === "seVolume") {
        return;
    }

    if (!isPlaying && round === 1 && score === 0){

        beginGame();

    } else {

        handleAction();
    }
});