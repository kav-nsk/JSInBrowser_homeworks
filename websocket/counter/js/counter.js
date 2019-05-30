'use strict';
// Интерфейс.
let numNet = document.querySelector('.counter');
let numErr = document.querySelector('output.errors');

let connWebSock = new WebSocket('wss://neto-api.herokuapp.com/counter');

connWebSock.addEventListener('message', event => {
    let data = JSON.parse(event.data);
    numNet.innerText = data.connections;
    numErr.innerText = data.errors;

});
window.addEventListener('beforeunload', () => {
    connWebSock.close(1000);
});