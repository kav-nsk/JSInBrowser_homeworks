'use strict'
// Интерфейс html страницы.
const slideBox = document.getElementsByClassName('slides')[0];
const navCockpit = document.getElementsByClassName('slider-nav')[0];


// Глобальные объявления.
let currSlide;


// Привязка обработчиков событий
navCockpit.addEventListener('click', moveSlide);


// Основной поток.
slideBox.firstElementChild.classList.add('slide-current');
checkButtons();


// Функции-обработчики событий.
function moveSlide(event) {
    if (event.target.classList != 'disabled') {
        switch (event.target.dataset.action) {
            case 'next': {
                currSlide.nextElementSibling.classList.add('slide-current');
                break;
            }
            case 'prev': {
                currSlide.previousElementSibling.classList.add('slide-current');
                break;
            }
            case 'first': {
                slideBox.firstElementChild.classList.add('slide-current');
                break;
            }
            case 'last': {
                slideBox.lastElementChild.classList.add('slide-current');
            }
        }
        currSlide.classList.remove('slide-current');
    }
    checkButtons();
}


// Прочие функции.
function checkButtons() {
    currSlide = slideBox.querySelector('.slide-current');
    if (currSlide.previousElementSibling  === null) {
        navCockpit.firstElementChild.classList.add('disabled');
        navCockpit.lastElementChild.previousElementSibling.classList.add('disabled');
        navCockpit.lastElementChild.classList.remove('disabled');
        navCockpit.firstElementChild.nextElementSibling.classList.remove('disabled');
        return;
    }
    if (currSlide.nextElementSibling === null) {
        navCockpit.lastElementChild.classList.add('disabled');
        navCockpit.firstElementChild.nextElementSibling.classList.add('disabled');
        navCockpit.firstElementChild.classList.remove('disabled');
        navCockpit.lastElementChild.previousElementSibling.classList.remove('disabled');
        return;
    }
    navCockpit.lastElementChild.classList.remove('disabled');
    navCockpit.firstElementChild.nextElementSibling.classList.remove('disabled');
    navCockpit.firstElementChild.classList.remove('disabled');
    navCockpit.lastElementChild.previousElementSibling.classList.remove('disabled');
}