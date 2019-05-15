'use strict'
// Интерфейс html страницы.
let loaderMes = document.getElementById('loader'); // сообщение загрузчика
let form = document.getElementById('content'); // форма калькулятора
let fromList = document.getElementById('from');
let toList = document.getElementById('to');
let inputNum = document.getElementById('source');
let outputNum = document.getElementById('result');

// Глобальные переменные, массивы, словари, присвоение обработчиков.
let xhr = new XMLHttpRequest;
let data;
fromList.addEventListener('input', calculate);
toList.addEventListener('input', calculate);
inputNum.addEventListener('input', calculate);

// Главный поток.
    // Получение внешних данных.
xhr.open('GET', 'https://neto-api.herokuapp.com/currency');
xhr.send();
xhr.addEventListener('load', afterLoadData);

loaderMes.classList.toggle('hidden');

// Обработчики событий.
function afterLoadData() {
    data = JSON.parse(xhr.responseText);
    // заполнение выпадающих списков
    for (let curr of data) {
        fromList.innerHTML += `<option id=${curr.code} ratio=${curr.value}>${curr.code}</option>`;
        toList.innerHTML += `<option id=${curr.code} ratio=${curr.value}>${curr.code}</option>`;
    }
    loaderMes.classList.toggle('hidden');
    form.classList.toggle('hidden');
}

function calculate() {
    let ratioFirst = fromList.querySelector('#' + fromList.value).getAttribute('ratio');
    let ratioSecond = toList.querySelector('#' + toList.value).getAttribute('ratio');
    outputNum.value = (ratioFirst / ratioSecond * inputNum.value).toFixed(2);
}