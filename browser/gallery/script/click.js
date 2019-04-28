'use strict';
const PHOTOFILENAME = [
'breuer-building.jpg',
'guggenheim-museum.jpg',
'headquarters.jpg',
'IAC.jpg',
'new-museum.jpg'
]

const photo = document.getElementById('currentPhoto');
const moveNextPhoto = document.getElementById('nextPhoto');
const movePrevPhoto = document.getElementById('prevPhoto');
var count = 0;  // указатель на файл в массиве PHOTOFILENAME

moveNextPhoto.onclick = movePhoto;
movePrevPhoto.onclick = movePhoto;
photo.src = 'i/' + PHOTOFILENAME[0];

function movePhoto() {
    var listLenght = PHOTOFILENAME.length;
    if (this.getAttribute('id') == 'prevPhoto') {
        count --;
    }
    if (this.getAttribute('id') == 'nextPhoto') {
        count ++;
    }
    if (count === listLenght) {
        count = 0;
    }
    if (count < 0) {
        count = listLenght - 1;
    }
    photo.src = 'i/' + PHOTOFILENAME[count];
}