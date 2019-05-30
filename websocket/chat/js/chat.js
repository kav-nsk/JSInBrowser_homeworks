'use strict';
// html интерфейс.
let chat = document.querySelector('.chat');
let chatStatus = chat.querySelector('.chat-status');
let messTemplate = chat.querySelectorAll('.message');
let listMess = chat.querySelector('.messages-content');
let messSendBar = chat.querySelector('.message-box');
let sendButton = messSendBar.querySelector('button.message-submit');
let inputLine = messSendBar.firstElementChild;

// Глобально.
let connection = new WebSocket('wss://neto-api.herokuapp.com/chat');
let currentTime;

// Определение обработчиков.
connection.addEventListener('message', incomingMess);
connection.addEventListener('open', () => {
    controlConnection('open')}
    );
connection.addEventListener('close', () => {
    controlConnection('close')}
    );
sendButton.addEventListener('click', (event) => {
    event.preventDefault();
    sendMess();
});
inputLine.addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {
        sendMess;
    }
});


function controlConnection(status) {
    let messStatus = messTemplate[3].cloneNode(true);
    if (status == 'open') {
        sendButton.removeAttribute('disabled');
        chatStatus.innerText = chatStatus.dataset.online;
        messStatus.firstElementChild.innerText = 'Пользователь появился в сети';
    }
    if (status == 'close') {
        sendButton.setAttribute('disabled', '');
        chatStatus.innerText = chatStatus.dataset.offline;
        messStatus.firstElementChild.innerText = 'Пользователь не в сети';
    }
    listMess.appendChild(messStatus);
}

function incomingMess(event) {
    if (event.data == '...') {
        let messLoad = messTemplate[0].cloneNode(true);
        listMess.appendChild(messLoad);
    } else {
        if (listMess.lastChild.className == 'message loading') {
            listMess.removeChild(listMess.lastChild);
        }
        let messMessage = messTemplate[1].cloneNode(true);
        currentTime = new Date();
        messMessage.querySelector('.message-text').innerText = event.data;
        messMessage.querySelector('.timestamp').innerText = currentTime
            .toLocaleTimeString('ru', {hour: 'numeric', minute: 'numeric'});
        if (listMess.childNodes.length > 8) {
            listMess.removeChild(listMess.firstElementChild);
        }
        listMess.appendChild(messMessage);
    }
}

function sendMess() {
    let messPersonal = messTemplate[2].cloneNode(true);
    currentTime = new Date();
    messPersonal.firstElementChild.innerText = inputLine.value;
    messPersonal.lastElementChild.innerText = currentTime
        .toLocaleTimeString('ru', {hour: 'numeric', minute: 'numeric'});
    if (listMess.childNodes.length > 8) {
        listMess.removeChild(listMess.firstElementChild);
    }
    listMess.appendChild(messPersonal);
    connection.send(inputLine.value);
}