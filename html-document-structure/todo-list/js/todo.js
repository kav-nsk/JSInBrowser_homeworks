'use strict'
// Интерфейс html страницы.
const doneForm = document.getElementsByClassName('done')[0];
const undoneForm = document.getElementsByClassName('undone')[0];

// Глобальные объявления.

// Привязка обработчиков событий
doneForm.addEventListener('click', moveTaskToUndone);
undoneForm.addEventListener('click', moveTaskToDone);

// Основной поток.

// Функции-обработчики событий.
function moveTaskToDone(task) {
    if ((task.target.firstElementChild !== null) &&
    (task.target.firstElementChild.type == 'checkbox')) {
        task.target.remove();
        task.target.firstElementChild.setAttribute('checked', '');
        doneForm.appendChild(task.target);
    }
}

function moveTaskToUndone(task) {
    if ((task.target.firstElementChild !== null) &&
    (task.target.firstElementChild.type == 'checkbox')) {
        task.target.remove();
        task.target.firstElementChild.removeAttribute('checked');
        undoneForm.appendChild(task.target);
    }
}

// Прочие функции.