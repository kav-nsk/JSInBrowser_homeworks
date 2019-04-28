'use strict'

const FOTOFILES = [
"airmax-jump.png",
"airmax-on-foot.png",
"airmax-playground.png",
"airmax-top-view.png",
"airmax.png"];

var objFoto = document.getElementById('slider');
objFoto.src = 'i/airmax-jump.png';
var i = 1;  // счетчик фотографий в массиве FOTOFILES

setInterval((list) => {
    objFoto.src = 'i/' + list[i];
    i++;
    if (i === list.length) {
        i = 0;
    }
}, 5000, FOTOFILES);