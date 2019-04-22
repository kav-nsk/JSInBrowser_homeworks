'use strict'

const FOTOFILES = [
"airmax-jump.png",
"airmax-on-foot.png",
"airmax-playground.png",
"airmax-top-view.png",
"airmax.png"];

var objFoto = document.getElementById('slider');
var i = 0;  // счетчик фотографий в массиве FOTOFILES

setInterval((list) => {
    if (i < list.length) {
        objFoto.src = 'i/' + list[i];
        i++;
    } else {
        i = 0;
    }
}, 5000, FOTOFILES);