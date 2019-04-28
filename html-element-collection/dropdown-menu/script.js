'use strict'

const MENU = document.getElementsByClassName('wrapper-dropdown');
MENU[0].onclick = function () {
    MENU[0].classList.toggle('active');
}