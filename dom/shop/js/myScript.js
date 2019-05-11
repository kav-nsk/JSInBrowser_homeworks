'use strict'
// Получим все необходимое
let buttonsNode = document.querySelectorAll('button.add');
let numGoodsInBasket = document.querySelector('#cart-count');
let totalPriceInBasket = document.querySelector('#cart-total-price');

numGoodsInBasket.totalNum = 0;  // Допсвойство "общее кол-во товаров".
totalPriceInBasket.totalPrice = 0;  // Допсвойство "общая стоимость товаров".

for(let butt of buttonsNode) {
    butt.addEventListener('click', addToBasket);
}


function addToBasket() {
    numGoodsInBasket.totalNum ++;
    totalPriceInBasket.totalPrice += +this.getAttribute('data-price');
    numGoodsInBasket.innerHTML = numGoodsInBasket.totalNum;
    totalPriceInBasket.innerHTML = getPriceFormatted(totalPriceInBasket.totalPrice);
}