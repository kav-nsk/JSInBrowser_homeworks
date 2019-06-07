'use strict';
// Глобально.
const canvasNode = document.getElementById('wall');
canvasNode.height = canvasNode.clientHeight;
canvasNode.width = canvasNode.clientWidth;
const canvasBack = canvasNode.getContext('2d');
canvasBack.strokeStyle = 'white';

const PI = Math.PI;
const moveInTime = [function nextPoint(x, y, time) {
    return {
        x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
        y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
    }
  }, function nextPoint(x, y, time) {
      return {
          x: x + Math.sin((x + (time / 10)) / 100) * 5,
          y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
        }
  }];

// Заполнение массивов параметрами фигур.
let crossList = [];
let circleList = [];
let num = Math.round(Math.random() * 75 + 25) * 2   // Случайое количество всех фигур.
for (let i = 0; i < num / 2; i++) {
    let x = Math.round(Math.random() * canvasNode.width);
    let y = Math.round(Math.random() * canvasNode.height);
    let s = Math.round((Math.random() * 5 + 1)) / 10;   // 0,1...0,6
    let w = Math.round((Math.random() * 40) - 20) / 10; // -0,2...0,2
    let f = Math.round(Math.random());
    crossList.push({'xInit': +x, 'yInit': +y, 'size': +s, 'velRot': +w, 'funcMove': +f, 'angle': 0});
}
for (let i = 0; i < num / 2; i++) {
    let x = Math.round(Math.random() * canvasNode.width);
    let y = Math.round(Math.random() * canvasNode.height);
    let s = Math.round((Math.random() * 5 + 1)) / 10;   // 0,1...0,6
    let f = Math.round(Math.random());
    circleList.push({'xInit': +x, 'yInit': +y, 'size': +s, 'funcMove': +f});
}

setInterval(controlPaint, 50);


function controlPaint() {
    controlPaint.numCross = 0;  // Счетчик по списку массива фигур.
    controlPaint.numCirc = 0; //              ---//---
    let curTime = new Date(); // Объект текущего времени.  
    // Очистка canvas.
    canvasBack.clearRect(0, 0, canvasNode.width, canvasNode.height);
    
    for (let i = 0; i < num; i++) {
        if (i % 2 == 0) {
            // Готовимся рисовать крестик.
            let crossObj = crossList[controlPaint.numCross];
                // Ограничение приращения числа радиан угла поворота.
            if (crossObj.angle > 2) {
                crossObj.angle -= 2;
            }
            if (crossObj.angle < -2) {
                crossObj.angle += 2;
            }
                // Получение координат как функции от времени.
            let xyObj = moveInTime[crossObj.funcMove](crossObj.xInit, crossObj.yInit, curTime.getTime());
            // Отрисовка креста с учетом требуемого размера (2х10size = 20size).
            paintCrossInTik(Math.round(xyObj.x), Math.round(xyObj.y), crossObj.size * 10, crossObj.angle * PI);
            crossObj.angle += crossObj.velRot; // Приращение угла поворота.
            crossList[controlPaint.numCross].angle = +crossObj.angle.toFixed(3); // Сохранить угол поворота в массиве фигур.
            controlPaint.numCross++;
        } else {
            // Рисование колец.
            let circleObj = circleList[controlPaint.numCirc];
            let xyObj = moveInTime[circleObj.funcMove](circleObj.xInit, circleObj.yInit, curTime.getTime());
            // Отрисовка кольца с учетом требуемого размера (2х6size = 12size).
            paintCircleInTik(Math.round(xyObj.x), Math.round(xyObj.y), circleObj.size * 6);
            controlPaint.numCirc++;
        }
    }
}

function paintCrossInTik(x, y, s, a) {
    canvasBack.lineWidth = 5 / 10 * s;
    canvasBack.beginPath();
    canvasBack.moveTo(x, y);
    canvasBack.lineTo( x + s * Math.cos(a), y + s * Math.sin(a));                    // ._
    canvasBack.lineTo(x + s * Math.cos(a + PI), y + s * Math.sin(a + PI));          // _._
    canvasBack.moveTo(x, y);
    canvasBack.lineTo( x + s * Math.cos(a + PI / 2), y + s * Math.sin(a + PI / 2)); // _!_
    canvasBack.lineTo( x + s * Math.cos(a - PI / 2), y + s * Math.sin(a - PI / 2)); // -|-
    canvasBack.stroke();
}

function paintCircleInTik(x, y, s) {
    canvasBack.lineWidth = 5 / 6 * s;
    canvasBack.beginPath();
    canvasBack.arc(x, y, s, 0, 2 * PI);
    canvasBack.stroke();
}