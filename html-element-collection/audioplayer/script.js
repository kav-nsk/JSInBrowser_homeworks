'use strict'

const TRACKS = [
    'LA Chill Tour.mp3',
    'LA Fusion Jam.mp3',
    'This is it band.mp3'
];

let currentTrackPos = 0;    // Номер позиции текущего трека в TRACKS
let curTime = 0;            // Временная метка для трека

let playerElem = document.getElementsByTagName('audio')[0]; // Элемент плеера
// Элемент динамичой картинки проигрывателя
let playerPicture = document.getElementsByClassName('mediaplayer')[0];
// Элемент отображения названия трека
let trackName = document.getElementsByTagName('span')[0];
// Коллекция кнопок управления плеером
const BUTTONS = document.getElementsByTagName('button');
// Элемент нопки play/pause
let elem = BUTTONS[1].getElementsByTagName('i');

// Кнопки + обработчики событий
BUTTONS[0].onclick = back;
BUTTONS[1].onclick = playstate;
BUTTONS[2].onclick = stop;
BUTTONS[3].onclick = next;


// Функции - обработчики событий кнопок управления плеером
function playstate() {
    if (elem[0].classList.toggle('fa-pause')) {
        player(currentTrackPos, curTime);
    } else {
        curTime = playerElem.currentTime;
        playerElem.pause();
        playerPicture.classList.remove('play');
    };
}

function stop() {
    playerElem.pause();
    curTime = 0;
    elem[0].className = 'fa fa-play';
    playerPicture.classList.remove('play');
}

function next() {
    currentTrackPos ++;
    if (currentTrackPos === TRACKS.length) {
        currentTrackPos = 0;
    }
    stop();
    playstate();
    let text = TRACKS[currentTrackPos];
    trackName.title = text.slice(0, text.length - 4);
}

function back() {
    currentTrackPos --;
    if (currentTrackPos < 0) {
        currentTrackPos = TRACKS.length - 1;
    }
    stop();
    playstate();
    let text = TRACKS[currentTrackPos];
    trackName.title = text.slice(0, text.length - 4);
}

// Остальные функции
function player(pos, time = 0) {
    playerElem.src = 'mp3/' + TRACKS[pos];
    playerElem.currentTime = time;
    playerElem.play();
    playerPicture.classList.add('play');
}