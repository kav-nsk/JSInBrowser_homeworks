'use strict'
const TRACKS = [
    'LA Chill Tour.mp3',
    'LA Fusion Jam.mp3',
    'This is it band.mp3'
];
let currentTrack = TRACKS[0];
const player = document.getElementsByTagName('audio')[0];

// Коллекция кнопок управления плеером
const BUTTONS = document.getElementsByTagName('button');


// Кнопки + обработчики событий
BUTTONS[0].onclick = back;
BUTTONS[1].onclick = playstate;
BUTTONS[2].onclick = stop;
BUTTONS[3].onclick = next;


// Функции - обработчики событий кнопок управления плеером
function playstate() {
    console.log('playstate');
}

function stop() {
    console.log('stop');
}

function next() {
    console.log('next');
}

function back() {
    console.log('back');
}


// Вспомогательные функции
function trackName() {

}