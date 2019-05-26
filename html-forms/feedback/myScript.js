'use strict'
// Интерфейс html страницы.
let inputForm = document.querySelector('.contentform');
let outputForm = document.querySelector('#output');
let inputList = inputForm.querySelectorAll('.form-group input,textarea');
let buttonSend = inputForm.querySelector('.button-contact');
let buttonEdit = outputForm.querySelector('.button-contact');


// Глобальные переменные, массивы, словари, присвоение обработчиков.
let index;
for (let inputLine of inputList) {
    inputLine.addEventListener('change', checkInputList);
    // доп. обработчик для поля индекса запрещающий ввод текста
    if (inputLine.getAttribute('name') == 'zip') {
        inputLine.addEventListener('input', function () {
            if (isNaN(this.value)) {
                this.value = index;
            } else {
                index = this.value;
            }
        });
    }
}
buttonSend.addEventListener('click', sendData);
buttonEdit.addEventListener('click', editData);


// Главный поток.
checkInputList();


// Обработчики событий.
function checkInputList() {
    let checkPass = true;
    for (let inputLine of inputList) {
        if (!inputLine.value) {
            checkPass = false;
        }
    }
    if (checkPass) {
        buttonSend.removeAttribute('disabled');
    } else {
        buttonSend.setAttribute('disabled', '');
    }
}

function sendData(event) {
    event.preventDefault();
    for (let inputLine of inputList) {
        let paramSend = inputLine.getAttribute('name');
        let nodeOutput = document.getElementById(paramSend);
        if (nodeOutput) {
            nodeOutput.value = inputLine.value;
        }
    }
    inputForm.classList.toggle('hidden');
    outputForm.classList.toggle('hidden');
}

function editData(event) {
    event.preventDefault();
    outputForm.classList.toggle('hidden');
    inputForm.classList.toggle('hidden');
}