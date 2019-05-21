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
            count ++;
            break;
        case 'decrement':
            if (count > 0) {
                count --;
            }
            break;
        case 'reset':
            count = 0;
    }
    counter.innerText = count;
    localStorage.setItem('myCount', count);
});

// Основной поток.
if (localStorage.myCount === undefined) {
    count = 0;
    counter.innerText = 0;
    localStorage.setItem('myCount', 0);
} else {
    count = localStorage.myCount;
    counter.innerText = count;
}
