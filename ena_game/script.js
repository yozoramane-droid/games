const gaugeCursor =
    document.getElementById("gaugeCursor");

const resultText =
    document.getElementById("resultText");

const character =
    document.getElementById("character");

const scoreText =
    document.getElementById("score");

const roundText =
    document.getElementById("round");

const soundToggleButton =
    document.getElementById("soundToggleButton");

const soundPanel =
    document.getElementById("soundPanel");

const bgmVolumeSlider =
    document.getElementById("bgmVolume");

const seVolumeSlider =
    document.getElementById("seVolume");

const voiceVolumeSlider =
    document.getElementById("voiceVolume");



let position = 0;

let direction = 1;

let speed = 1;

let animationId = null;

let isPlaying = false;

let score = 0;

let round = 1;



let bgmVolumeCal = 0.2;
let seVolumeCal = 0.2;
let voiceVolumeCal = 1.0;

let bgmVolume = 0.7;
let seVolume = 0.7;
let voiceVolume = 0.9;



const bgm =
    new Audio("assets/audio/bgm.mp3");

const perfectSe =
    new Audio("assets/audio/perfect.mp3");

const hitSe =
    new Audio("assets/audio/hit.mp3");

const missSe =
    new Audio("assets/audio/miss.mp3");

const hitVoice =
    new Audio("assets/audio/good_voice.mp3");

const missVoice =
    new Audio("assets/audio/miss_voice.mp3");



bgm.loop = true;



setVolumes();



function setVolumes() {

    bgm.volume =
        bgmVolume * bgmVolumeCal;

    perfectSe.volume =
        seVolume * seVolumeCal;

    hitSe.volume =
        seVolume * seVolumeCal;

    missSe.volume =
        seVolume * seVolumeCal;

    hitVoice.volume =
        voiceVolume * voiceVolumeCal;

    missVoice.volume =
        voiceVolume * voiceVolumeCal;
}



function playSound(audio) {

    const sound =
        audio.cloneNode();

    sound.volume =
        audio.volume;

    sound.play();
}



function startGame() {

    if (isPlaying) {
        return;
    }

    isPlaying = true;

    bgm.play();

    resultText.textContent =
        "画面をタッチ";

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

        playSound(perfectSe);

        playSound(hitVoice);

        changeCharacter("happy");

    } else if (distance < 10) {

        result = "いいね！";

        resultText.classList.add("good");

        score += 50;

        playSound(hitSe);

        playSound(hitVoice);

        changeCharacter("happy");

    } else {

        result = "ざんねん";

        resultText.classList.add("miss");

        playSound(missSe);

        playSound(missVoice);

        changeCharacter("sad");
    }



    resultText.textContent =
        result;

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

    gaugeCursor.style.left =
        "0%";

    isPlaying = true;

    updateGauge();
}



function changeCharacter(type) {

    if (type === "happy") {

        character.src =
            "assets/img/happy.png";

        character.style.transform =
            "scale(1.15)";

    } else {

        character.src =
            "assets/img/sad.png";

        character.style.transform =
            "scale(0.9)";
    }



    setTimeout(() => {

        character.src =
            "assets/img/normal.png";

        character.style.transform =
            "scale(1)";

    }, 1000);
}



function beginGame() {

    if (!isPlaying &&
        round === 1 &&
        score === 0) {

        startGame();
    }
}



function handleAction() {

    if (!isPlaying) {
        return;
    }

    stopGauge();
}



document.addEventListener(
    "keydown",
    (e) => {

        if (e.code === "Space") {

            e.preventDefault();

            handleAction();
        }

        if (e.code === "Enter") {

            beginGame();
        }
    }
);



document.addEventListener(
    "pointerdown",
    (e) => {

        if (
            e.target.id === "soundToggleButton" ||
            e.target.id === "bgmVolume" ||
            e.target.id === "seVolume" ||
            e.target.id === "voiceVolume"
        ) {
            return;
        }

        if (
            !isPlaying &&
            round === 1 &&
            score === 0
        ) {

            beginGame();

        } else {

            handleAction();
        }
    }
);



bgmVolumeSlider.addEventListener(
    "input",
    (e) => {

        bgmVolume =
            Number(e.target.value);

        setVolumes();
    }
);



seVolumeSlider.addEventListener(
    "input",
    (e) => {

        seVolume =
            Number(e.target.value);

        setVolumes();
    }
);



soundToggleButton.addEventListener(
    "click",
    () => {

        soundPanel.classList.toggle(
            "hidden"
        );
    }
);

voiceVolumeSlider.addEventListener(
    "input",
    (e) => {

        voiceVolume =
            Number(e.target.value);

        setVolumes();
    }
);