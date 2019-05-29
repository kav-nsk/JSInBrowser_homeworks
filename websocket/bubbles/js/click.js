'use strict';

let connectWebSocket = new WebSocket('wss://neto-api.herokuapp.com/mouse');

document.addEventListener('click', sendCoord);

showBubbles(connectWebSocket);

function sendCoord(event) {
    connectWebSocket.send(JSON.stringify({'x': event.clientX, 'y': event.clientY}));
}