'use strict'
// Интерфейс html страницы.
let inputForm = document.querySelector('.contentform');
let outputForm = document.querySelector('#output');
let inputList = inputForm.querySelectorAll('.form-group input,textarea');
//let outputList = outputForm.querySelectorAll('output');
let buttonSend = inputForm.querySelector('.button-contact');
let buttonEdit = outputForm.querySelector('.button-contact');

console.log(inputList);
//console.log(outputList.length);

// Глобальные переменные, массивы, словари, присвоение обработчиков.
for (let inputLine of inputList) {
    inputLine.addEventListener('change', checkInputList);
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