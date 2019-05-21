'use strict';
// html интерфейс
const signInFormNodes = document.getElementsByClassName('sign-in-htm')[0];
const regFormNodes = document.getElementsByClassName('sign-up-htm')[0];

const signInButton = signInFormNodes.querySelector('.button').parentNode;
const regButton = regFormNodes.querySelector('.button').parentNode;

const messSignForm = signInFormNodes.querySelector('.error-message');
const messRegForm = regFormNodes.querySelector('.error-message');

const signInForm = new FormData(signInFormNodes);
const regForm = new FormData(regFormNodes);

// Глобальные объявления.
const xhrSendSignIn = new XMLHttpRequest();
const xhrSendReg = new XMLHttpRequest();

// Присвоение обработчиков событий
signInButton.addEventListener('click', sendSign);
regButton.addEventListener('click', sendReg);
xhrSendSignIn.addEventListener('load', afterLoadSign);
xhrSendReg.addEventListener('load', afterLoadReg);

// Функции-обработчики событий
function sendSign(event) {
    event.preventDefault();
    xhrSendSignIn.open('POST', 'https://neto-api.herokuapp.com/signin');
    xhrSendSignIn.setRequestHeader('Content-Type', 'application/json');
    xhrSendSignIn.send(JSON.stringify(signInForm));
}

function sendReg(event) {
    event.preventDefault();
    xhrSendReg.open('POST', 'https://neto-api.herokuapp.com/signup');
    xhrSendReg.setRequestHeader('Content-Type', 'application/json');
    xhrSendReg.send(JSON.stringify(regForm));
}

function afterLoadSign() {
    let reply = JSON.parse(xhrSendSignIn.responseText);
    if (!reply.error) {
        messSignForm.innerText = 'Пользователь Иван успешно авторизован';
    } else {
        messSignForm.innerText = reply.message;
    }
}

function afterLoadReg() {
    let reply = JSON.parse(xhrSendReg.responseText);
    if (!reply.error) {
        messRegForm.innerText = 'Пользователь Иван успешно зарегистрирован';
    } else {
        messRegForm.innerText = reply.message;
    }
}