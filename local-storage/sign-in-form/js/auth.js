'use strict';
// html интерфейс
const signInFormNodes = document.querySelector('.sign-in-htm');
const regFormNodes = document.querySelector('.sign-up-htm');

const signInButton = signInFormNodes.querySelector('.button').parentNode;
const regButton = regFormNodes.querySelector('.button').parentNode;

const messSignForm = signInFormNodes.querySelector('.error-message');
const messRegForm = regFormNodes.querySelector('.error-message');

const signInForm = {};
const regForm = {};

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
    signInForm.email = signInFormNodes.querySelector('#email').value;
    signInForm.password = signInFormNodes.querySelector('#pass').value;
    xhrSendSignIn.open('POST', 'https://neto-api.herokuapp.com/signin');
    xhrSendSignIn.setRequestHeader('Content-Type', 'application/json');
    xhrSendSignIn.send(JSON.stringify(signInForm));
}

function sendReg(event) {
    event.preventDefault();
    regForm.email = regFormNodes.querySelector('#email').value;
    regForm.password = regFormNodes.querySelectorAll('#pass')[0].value;
    regForm.passwordcopy = regFormNodes.querySelectorAll('#pass')[1].value;
    regForm.name = regFormNodes.querySelectorAll('#pass')[2].value;
    xhrSendReg.open('POST', 'https://neto-api.herokuapp.com/signup');
    xhrSendReg.setRequestHeader('Content-Type', 'application/json');
    xhrSendReg.send(JSON.stringify(regForm));
}

function afterLoadSign() {
    let reply = JSON.parse(xhrSendSignIn.responseText);
    if (!reply.error) {
        messSignForm.innerText = `Пользователь ${reply.name} успешно авторизован`;
    } else {
        messSignForm.innerText = reply.message;
    }
}

function afterLoadReg() {
    let reply = JSON.parse(xhrSendReg.responseText);
    if (!reply.error) {
        messRegForm.innerText = `Пользователь ${reply.name} успешно зарегистрирован`;
    } else {
        messRegForm.innerText = reply.message;
    }
}