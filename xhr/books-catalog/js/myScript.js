'use strict'
// Получение необходимых элементов из html.
let nodeContent = document.getElementById('content');
let templateForNodeBook = nodeContent.innerHTML; // Берем существующий <li> за шаблон.

// Получение удаленных данных и вызов функции дальнейшей обработки.
let xhr = new XMLHttpRequest();
xhr.addEventListener('load', (event) => {
    let JSONData = JSON.parse(xhr.responseText);
    nodeContent.innerHTML = ''; // Затрем существующий пример.
    editHtml(JSONData);
});
xhr.open('GET', 'https://neto-api.herokuapp.com/book/', true);
xhr.send();

// Изменения в html.
function editHtml(JSONData) {
    for (let obj of JSONData) {
        nodeContent.innerHTML += templateForNodeBook;
        let nodeForEdit = nodeContent.querySelector('li:last-child');
        nodeForEdit.dataset.title = obj.title;
        nodeForEdit.dataset.author = obj.author;
        nodeForEdit.dataset.info = obj.info;
        nodeForEdit.dataset.price = obj.price;
        nodeForEdit.querySelector('img').src = obj.cover.small;
    }
}