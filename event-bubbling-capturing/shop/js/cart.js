'use strict';

// Присвоение обработчиков событий.
showMore.addEventListener('click', setEventToCartButtons);

// Основной поток.
setEventToCartButtons();
 
// Функции-обработчики событий.
function setEventToCartButtons() {
    let addToCartButtons = list.getElementsByClassName('add-to-cart');
    for (let button of addToCartButtons) {
        button.addEventListener('click', event => {
            event.preventDefault();
            let item = {};
            item.title = event.currentTarget.dataset.title;
            item.price = event.currentTarget.dataset.price;
            addToCart(item);  
        });
    }
}