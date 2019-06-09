'use strict';
// Глобальные объявления.
const canvasNode = document.getElementById('draw');
const canvas = canvasNode.getContext('2d');

// Свойства функции рисования drawCurve.
drawCurve.turnOn = false;   // Флаг разрешения рисования.
drawCurve.initPos = {'x': 0, 'y': 0};  // Начальная позиция рисования кривой.
/*
drawCurve.widthLine;        // Толщина линии.
drawCurve.widthLineExtrem;  // Предел к которому стремится толщина линии.
drawCurve.colorHsl;         // Цвет линии.
*/

// Обработчики собтий.
window.addEventListener('resize', function() {
    setSizeCanvas();
    clearCanvas();
});
document.addEventListener('DOMContentLoaded', setSizeCanvas);
canvasNode.addEventListener('dblclick', clearCanvas);
canvasNode.addEventListener('mousedown', (event) => {
    drawCurve.turnOn = event.button === 0 ? true : false;
    drawCurve.initPos.x = event.clientX;
    drawCurve.initPos.y = event.clientY;
    drawCurve.widthLine = 100;
    drawCurve.widthLineExtrem = 5;
    drawCurve.colorHsl = 0;
});
canvasNode.addEventListener('mouseup', () => {
    drawCurve.turnOn = false;
});
canvasNode.addEventListener('mousemove', (event) => {
    if (drawCurve.turnOn) {
        drawCurve(event);
    }
});
canvasNode.addEventListener('mouseout', () => {
    drawCurve.turnOn = false;
});


function setSizeCanvas() {
    canvasNode.width = window.innerWidth;
    canvasNode.height = window.innerHeight;
}

function clearCanvas() {
    canvas.clearRect(0, 0, canvasNode.width, canvasNode.height);
}

function drawCurve (event) {
    // Стили линии.
    canvas.lineWidth = drawCurve.widthLine;
    canvas.lineJoin = 'round';
    canvas.lineCap = 'round';
    canvas.strokeStyle = `hsl(${drawCurve.colorHsl}, 100%, 50%)`;

    canvas.beginPath();
    canvas.moveTo(drawCurve.initPos.x, drawCurve.initPos.y);
    canvas.lineTo(event.clientX, event.clientY);
    canvas.stroke();

    // Изменение цвета в пределах 0...360.
    if (!event.shiftKey && drawCurve.colorHsl < 360) {
        drawCurve.colorHsl ++;
    }
    if (event.shiftKey && drawCurve.colorHsl > 0) {
        drawCurve.colorHsl --;
    }
    // Ограничение пределов толщины 5...100.
    if (drawCurve.widthLine >= drawCurve.widthLineExtrem) {
        drawCurve.widthLineExtrem = 5;
        drawCurve.widthLine --;
    } else {
        drawCurve.widthLineExtrem = 100;
        drawCurve.widthLine ++;
    }
    // Обновление координат начальной точки рисования.
    drawCurve.initPos.x = event.clientX;
    drawCurve.initPos.y = event.clientY;
}