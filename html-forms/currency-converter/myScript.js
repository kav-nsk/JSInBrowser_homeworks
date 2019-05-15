'use strict'
// Интерфейс html страницы.


// Глобальные переменные, массивы, словари.
let xhr = new XMLHttpRequest;

// Получение внешних данных.
xhr.open('GET', 'https://neto-api.herokuapp.com/currency');
xhr.send();

// Определение обработчиков событий.


// Исполнительные функции.
