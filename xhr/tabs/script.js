'use strict'
// Для хранения объектов управления.
let objControl = {};
// Получаем из document необходимые элементы.
let nodesTab = document.querySelectorAll('nav a');
let printContent = document.getElementById('content');

// Заполняем objControl объектами управления c присвоением обработчиков событий.
for (let n of nodesTab) {
    let item = n.innerHTML.toLocaleLowerCase();
    objControl[item] = n;
    if (n.className == 'active') {
        objControl.active = item; // Допсвойство, указывающее на активную вкладку.
    }
    n.addEventListener('click', function(even) {
        even.preventDefault();
        objControl[objControl.active].className = '';
        this.className = 'active';
        objControl.active = this.innerHTML.toLocaleLowerCase();
        getDataToActivTab();
    });
}

getDataToActivTab();


// Запрос и получение удаленных данных. Вывод под активную вкладку.
function getDataToActivTab() {
    let indicatorLoad = document.getElementById('preloader');
    let address = objControl[objControl.active].href;
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
        indicatorLoad.className = 'hidden';
        printContent.innerHTML = xhr.responseText;
    })
    xhr.open('GET', address, true);
    indicatorLoad.className = '';
    xhr.send();
}