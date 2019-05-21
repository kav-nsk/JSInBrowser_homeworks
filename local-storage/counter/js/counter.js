'use strict';
// Интерфейс html.
const counter = document.getElementById('counter');
const buttonsBar = document.getElementsByClassName('wrap-btns')[0];

// Глобальные переменные.
let count;

// Обработчики событий.
buttonsBar.addEventListener('click', (event) => {
    switch (event.target.id) {
        case 'increment':
            console.log('+');
            count ++;
            break;
        case 'decrement':
            console.log('-');
            if (count > 0) {
                count --;
            }
            break;
        case 'reset':
            console.log('res');
            count = 0;
    }
    counter.innerText = count;
    localStorage.setItem('myCount', count);
});

// Основной поток.
console.log(localStorage.myCount);
if (localStorage.myCount === undefined) {
    count = 0;
    counter.innerText = 0;
    localStorage.setItem('myCount', 0);
} else {
    count = localStorage.myCount;
    counter.innerText = count;
}
