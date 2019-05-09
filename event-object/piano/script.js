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

let n = 0;											// Для присвоения номера клавиши
for (let key of keys) {
	key.addEventListener('click', playSound);
	key.number = n
	n++;
   }

function playSound (event) {
	let path = 'Middle';
	let playElem = this.getElementsByTagName('audio')[0];
	pianoColor.className = 'middle';
	if (event.altKey) {		// Проверял на CTRL, ALT  в FF под Linux блокирует клик от мыши
		path = 'Hight';
		pianoColor.className = 'higher';
	} else if (event.shiftKey) {
		path = 'Low';
		pianoColor.className = 'lower';
	}
	event.preventDefault();
	playElem.src = pathToSetTone[path] + nameFiles[this.number];
	playElem.currentTime = 0;
	playElem.play();
    return;
}