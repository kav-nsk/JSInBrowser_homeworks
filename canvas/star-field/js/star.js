'use strict';
const color = ['#ffffff', '#ffe9c4', '#d4fbff'];
const PI = Math.PI;
const canvas = document.querySelector('canvas');
canvas.addEventListener('click', paintStarrySky);
const objCanvas = canvas.getContext('2d');
paintStarrySky();

function paintStarrySky() {
    objCanvas.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 200 + Math.round(Math.random() * 200); i != 0; i--) {
        let colorStar = Math.floor(Math.random() * 3);
        let sizeStar = (Math.random() * 1.1).toFixed(1);
        let brightStar = (Math.random() * 0.2 + 0.8).toFixed(1);
        let xPos = Math.round(Math.random() * canvas.width);
        let yPos = Math.round(Math.random() * canvas.height);
        objCanvas.beginPath();
        objCanvas.arc(xPos, yPos, sizeStar, 0, 2 * PI);
        objCanvas.fillStyle = color[colorStar];
        objCanvas.globalAlpha = brightStar;
        objCanvas.fill();
    }
}