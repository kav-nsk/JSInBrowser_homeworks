'use strict'
let nameFiles = [
    'first.mp3',
    'second.mp3',
    'third.mp3',
    'fourth.mp3',
    'fifth.mp3'
];
let pathToSetTone = {
    'Hight' : 'sounds/higher/',
    'Low' : 'sounds/lower/',
    'Middle' : 'sounds/middle/'
};

// Получаем нужные элементы
let pianoColor = document.getElementsByTagName('ul')[0]; // Цвет оформления в зависимости от тона
let keys = document.getElementsByTagName('li');		  // Набор клавиш
let playElem = document.getElementsByTagName('audio');// Набор элементов-плееров

for (let key of keys) {
	key.addEventListener('click', playSound);
   }

function playSound (event) {
	let path = 'Middle';
	pianoColor.className = 'middle';
	if (event.ctrlKey) {			// По заданию ALT кнопка
		path = 'Hight';
		pianoColor.className = 'higher';
	} else if (event.shiftKey) {
		path = 'Low';
		pianoColor.className = 'lower';
	}
	for (let i = 0; i != keys.length; i++) {
		playElem[i].src = pathToSetTone[path] + nameFiles[i];
		playElem[i].currentTime = 0;
	}
	this.getElementsByTagName('audio')[0].play();
    return;
}