'use strict';
// Интерфейс html страницы.
let tabBar = document.getElementsByClassName('tabs-nav')[0];
let tabsContent = document.getElementsByClassName('tabs-content')[0].childNodes;
let tabTemplate = document.querySelector('.tabs-nav li').cloneNode(true);

// Глобальные объявления.

// Привязка обработчиков событий.
tabBar.addEventListener('click', setActiveTab);

// Основной поток.
    // Удаляем заготовку из разметки.
tabBar.removeChild(tabBar.firstElementChild);
    // Работаем только с < > без #text.
for (let i of tabsContent) {
    if (i.childNodes.length != 0) {
        tabTemplate.firstElementChild.innerText = i.dataset.tabTitle;
        tabTemplate.firstElementChild.classList = i.dataset.tabIcon;
        tabBar.appendChild(tabTemplate.cloneNode(true));
    }
}
tabBar.firstElementChild.classList.add('ui-tabs-active');// первая вкладка активная
setText(); // Делаем видимой только первую статью.


// Функции-обработчики событий.
function setActiveTab(event) {
    // Отрабатываем только на <a>.
    if (event.target.getElementsByTagName('a').length == 0) {
        for (let i of tabBar.childNodes) {
            if (i.childNodes.length != 0 && i.classList.contains('ui-tabs-active')) {
                i.classList.remove('ui-tabs-active');
            }
        }
        event.target.parentElement.classList.add('ui-tabs-active');
    }
    setText();
}


// Прочие функции.
    // Показываем текст активной вкладки и скрываем остальной.
function setText () {
    for (let i of tabBar.childNodes) {
        if (i.childNodes.length != 0 && i.classList.contains('ui-tabs-active')) {
            for (let j of tabsContent) {
                if (j.childNodes.length != 0 &&
                    j.dataset.tabTitle.toUpperCase() != i.firstElementChild.innerText) {
                    j.classList.add('hidden');
                } else {
                    j.classList = '';
                }
            }
        }
    }
}