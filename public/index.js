const tiles = document.querySelectorAll('.tile');
const score = document.getElementById('score');
const piano = document.getElementById('piano');
const hit = document.getElementById('hit');
const mistake = document.getElementById('mistake');
const mainTiles = document.querySelectorAll('.main-tile');
const multiplier = document.getElementById('multiplier');
const sequence = document.getElementById('sequence');

const tileFs = document.getElementById('tile-fs');
const tileSc = document.getElementById('tile-sc');
const tileTd = document.getElementById('tile-td');
const tileFt = document.getElementById('tile-ft');
const keys = document.querySelectorAll('.key');

const percent = document.querySelector('.percent');
const bar = document.querySelector('.bar');

const inputFile = document.getElementById('music-file');


const multipliersList = [10, 50, 100, 150, 200];

let music;
let points = 0;
let hits = 0;
let mistakes = 0;
let multiplierCount = 1;
let consecutiveHits = 0;
let musicIsPlaying = false;
let percentValue = 0;
let num;

score.textContent = "Score: " + points;
hit.textContent = "Hits: " + hits;
mistake.textContent = "Mistakes: " + mistakes;
multiplier.textContent = "Multiplier: x" + multiplierCount;
sequence.textContent = "Sequence: " + consecutiveHits;
percent.textContent = "0%";


for (let i = 0; i < tiles.length; i += 4) {
    num = randNum(4);
    tiles[num + i].classList.add('black-tile');
}

setInterval(() => {
    if (musicIsPlaying) {
        percentValue = getPercent();
        percent.textContent = "%" + percentValue;
        bar.style.width = `${num}%;`
        console.log(bar.style.width);
    }
}, 1000);

inputFile.addEventListener('change', setMusic, false);

document.addEventListener('keydown', (e) => {
    const key = e.key;
    if (key == 'q') {
        removeStyle()
        if (keys[0].classList.contains('key-pressed') == false) {
            keys[0].classList.add('key-pressed');
        }
        playGame(tileFs);
    }
    if (key == 'w') {
        removeStyle()
        if (keys[1].classList.contains('key-pressed') == false) {
            keys[1].classList.add('key-pressed');
        }
        playGame(tileSc);
    }
    if (key == 'e') {
        removeStyle()
        if (keys[2].classList.contains('key-pressed') == false) {
            keys[2].classList.add('key-pressed');
        }
        playGame(tileTd);
    }
    if (key == 'r') {
        removeStyle()
        if (keys[3].classList.contains('key-pressed') == false) {
            keys[3].classList.add('key-pressed');
        }
        playGame(tileFt);
    }
});

mainTiles.forEach((element) => {
    element.addEventListener('click', (e) => {
        playGame(element);
    });
});

function removeStyle() {
    keys.forEach((key) => {
        if (key.classList.contains('key-pressed')) {
            key.classList.remove('key-pressed');
        }
    });
}

function playGame(element) {
    if (element.classList.contains('black-tile')) {
        points = points + (multiplierCount * 10);
        hits++;
        consecutiveHits++;
        multipliersList.find((number) => {
            if (number == consecutiveHits) {
                multiplierCount++;
                return;
            }
        });
        music.play();
        musicIsPlaying = true;
    } else {
        points -= 10;
        mistakes++;
        multiplierCount = 1;
        if (points < 0) {
            points = 0;
        }
        consecutiveHits = 0;
        music.pause();
        musicIsPlaying = false;
    }
    score.textContent = "Score: " + points;
    hit.textContent = "Hits: " + hits;
    mistake.textContent = "Mistakes: " + mistakes;
    multiplier.textContent = "Multiplier: x" + multiplierCount;
    sequence.textContent = "Sequence: " + consecutiveHits;

    for (let j = 0; j < 4; j++) {
        for (let i = tiles.length - 1; i > 0; i--) {
            if (tiles[i].classList.contains('black-tile')) {
                tiles[i].classList.remove('black-tile');
            }
            if (tiles[i - 1].classList.contains('black-tile')) {
                tiles[i - 1].classList.remove('black-tile')
                tiles[i].classList.add('black-tile');
            }

        }
    }
    let newTile = randNum(4);
    for (let i = 0; i < 4; i++) {
        if (tiles[i].classList.contains('black-tile')) {
            tiles[i].classList.remove('black-tile');
        }
    }
    tiles[newTile].classList.add('black-tile');
}

function randNum(max) {
    return Math.floor(Math.random() * max);
}

function setMusic() {
    const urlObj = URL.createObjectURL(inputFile.files[0]);
    const audio = document.createElement("audio");
    audio.addEventListener("load", () => {
        URL.revokeObjectURL(urlObj);
    });
    audio.src = urlObj;
    music = audio;
}

function getPercent() {
    let fullValue = music.duration;
    let partialValue = music.currentTime;
    let totalPercentage = 100;  
    let partialPercentage =  (totalPercentage * partialValue) / fullValue;
    return partialPercentage.toFixed(2);
}