'use strict'
// Получение необходимых элементов из html.
let listBlock = document.querySelector('.list-block');
let checkboxLines = listBlock.getElementsByTagName('li');
let checkboxNodes = listBlock.getElementsByTagName('input');
let outputLine = listBlock.querySelector('output');

// Глобальные переменные, массивы, словари
listBlock.dataset.numAllCheked = 0;  // Количество выполненных задач.

statusChecked();
showCheckedComplite();

// Определение обработчиков событий.
for (let li of checkboxLines) {
    li.addEventListener('click', function() {
        statusChecked();
        showCheckedComplite();
        listBlock.dataset.numAllCheked = 0;
    });
}

// Исполнительные функции.
function statusChecked() {
    for (let checkbox of checkboxNodes) {
        if (checkbox.checked) {
            listBlock.dataset.numAllCheked ++;
        }
    }
}

function showCheckedComplite() {
    outputLine.innerHTML = `${listBlock.dataset.numAllCheked} из ${checkboxLines.length}`;
    if (+listBlock.dataset.numAllCheked === checkboxLines.length) {
        listBlock.className += ' complete';
    } else {
        listBlock.className = 'list-block';
    }
}