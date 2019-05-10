'use strict'

document.addEventListener('keydown', symbolControl);

let nav = document.getElementsByTagName('nav')[0];
let secret = document.getElementsByClassName('secret')[0];
let secretCode = 'ytnjkjubz';
symbolControl.numSym = 0; // очередной номер символа обрабатываемого функцией

function symbolControl(event) {
    // По заданию CTRL+ALT+T. В Linux при этом вызывается Терминал.
    // Отлаживал на ALT+SHIFT+T.
    if (event.code == "KeyT" && event.altKey && event.ctrlKey) {
        event.preventDefault();
        if (!nav.className) {
            nav.className = 'visible';
            return;
        } else {
            nav.className = '';
            return;
        }
    }
    // Проверка на ввод секретного кода
    if (event.code == ('Key' + secretCode[symbolControl.numSym].toUpperCase())) {
        symbolControl.numSym ++;
        if (symbolControl.numSym === secretCode.length) {
            secret.className += ' visible';
            symbolControl.numSym = 0;
        }
    } else {
        symbolControl.numSym = 0;
    }
    return;
}