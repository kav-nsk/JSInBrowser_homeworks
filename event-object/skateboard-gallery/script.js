'use strict'
let listProducts = document.getElementsByTagName('a');
let mainView = document.getElementById('view');
let numCurrentProduct = 0;
let n = 0; // для назначения порядкового номера продукта в галерее

for (let product of listProducts) {
    product.addEventListener('click', showProduct);
    product.numProduct = n;
    n++;
}

function showProduct(event) {
    if (this.className == '') {
        listProducts[numCurrentProduct].className = '';
        this.className = 'gallery-current';
        numCurrentProduct = this.numProduct;
    }
    mainView.src = this.href;
    event.preventDefault();
}