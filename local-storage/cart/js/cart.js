'use strict';
// Интерфейс html.
let toColorSwatch = document.getElementById('colorSwatch');  // Для ввода html разметки по цветам товара.
let toSizeSwatch = document.getElementById('sizeSwatch');    // Для ввода html разметки по размерам.
const toQuickCart = document.getElementById('quick-cart');      // Для размещения корзины.
const addToCartForm = document.getElementById('AddToCartForm'); // Форма отправки заказа.
const addToCartButton = document.getElementById('AddToCart').parentElement; // Кнопка добавления в корзину.


// Глобальные объявления.
const colorUrl = 'https://neto-api.herokuapp.com/cart/colors';
const sizeUrl = 'https://neto-api.herokuapp.com/cart/sizes';
const basketUrl = 'https://neto-api.herokuapp.com/cart';
const sendBasketUrl = 'https://neto-api.herokuapp.com/cart';
const removeBasketUrl = 'https://neto-api.herokuapp.com/cart/remove';
let xhrColor = new XMLHttpRequest();
let xhrSize = new XMLHttpRequest();
let xhrBasket = new XMLHttpRequest();
let xhrSendCart = new XMLHttpRequest();
let saveParam;  // Параметры для хранения в localStorage.


// Присвоение обработчиков событий.
xhrColor.addEventListener('load', () => {
    let xhrColorJson = JSON.parse(xhrColor.responseText); // Преобразовать и отобразить
    displayColor(xhrColorJson);                           // на странице варианты цвета.
});
xhrSize.addEventListener('load', () => {
    let xhrSizeJson = JSON.parse(xhrSize.responseText); // Преобразовать и отобразить
    displaySize(xhrSizeJson);                           // на странице доступные размеры.
});    
xhrBasket.addEventListener('load', () => {
    let xhrBasketJson = JSON.parse(xhrBasket.responseText);
    displayCartAndProduct(xhrBasketJson); // После получения данных, обновить отображение корзины и товара.
});
xhrSendCart.addEventListener('load', basketUpdate); // После отправки данных, обновить корзину с сервера.

toColorSwatch.addEventListener('click', setColor);  // Выбор цвета.
toSizeSwatch.addEventListener('click', setSize);    // Выбор размера.
addToCartButton.addEventListener('click', saveCart);  // Отправка данных формы на сервер.


// Основной поток.
    // Если нет локально сохраненных данных о товаре, создаем объект в хранилище,
    // иначе воссоздаем объект с текущими отметками цвета и размера из хранилища.
if (localStorage.cart !== undefined) {
    saveParam = JSON.parse(localStorage.cart);
} else {
    localStorage.cart = JSON.stringify({'color':'', 'size':''});
}
    // Получение исходных данных.
xhrColor.open('GET', colorUrl);
xhrColor.send();
xhrSize.open('GET', sizeUrl);
xhrSize.send();
xhrBasket.open('GET', basketUrl);
xhrBasket.send();


function setColor(event) {
    if (event.target.tagName == 'INPUT') {
        Array.from(toColorSwatch.getElementsByTagName('input')).forEach(i => {
            if (i.hasAttribute('checked')) {
                i.removeAttribute('checked');
            }
        });
        event.target.setAttribute('checked', '');
        // Запись состояния цвета в объект localStorage.
        let objSend = JSON.parse(localStorage.cart);
        objSend.color = event.target.getAttribute('id');
        localStorage.cart = JSON.stringify(objSend);
    }
}

function setSize(event) {
    if (event.target.tagName == 'INPUT') {
        Array.from(toSizeSwatch.getElementsByTagName('input')).forEach(i => {
            if (i.hasAttribute('checked')) {
                i.removeAttribute('checked');
            }
        });
        event.target.setAttribute('checked', '');
        // Запись состояния размера в объект localStorage.
        let obj = JSON.parse(localStorage.cart);
        obj.size = event.target.getAttribute('id');
        localStorage.cart = JSON.stringify(obj);
    }
}

function saveCart(event) {
    event.preventDefault();
    let data = new FormData(addToCartForm);
    data.append('productId', addToCartForm.dataset.productId);
    xhrSendCart.open('POST', sendBasketUrl);
    xhrSendCart.send(data);
}

function basketUpdate() {
    xhrBasket.open('GET', basketUrl);
    xhrBasket.send();
}

function displayColor(json) {
    let color, code, colorDescript, available, disabled, checked;
    for (let data of json) {
        color = data.type;
        code  = data.code;
        colorDescript = data.title;
        if (data.isAvailable) {
            available = 'available';
            disabled = 'NOdisabled';
        } else {
            available = 'soldout';
            disabled = 'disabled';
        }
        if (saveParam.color == `swatch-1-${color}`) {
            checked = 'checked';
        } else {
            checked = '';
        }
        //  Цвет товара и код цвета: {color}. Доступность: {soldout/available} и {disabled}. Описание цвета: {colorDescript}.
        const htmlColorSwatch = (`<div data-value="${color}" class="swatch-element color ${color} ${available}">
        <div class="tooltip">${colorDescript}</div>
        <input quickbeam="color" id="swatch-1-${color}" type="radio" name="color" value="${color}" ${disabled} ${checked}>
        <label for="swatch-1-${color}" style="border-color: red;"><span style="background-color: ${code};"></span>
        <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886"></label></div>`);
        toColorSwatch.innerHTML += htmlColorSwatch;
    }
}

function displaySize(json) {
    let size, available, disabled, sizeDescript, checked;
    for (let data of json) {
        size = data.type;
        sizeDescript = data.title;
        if (data.isAvailable) {
            available = 'available';
            disabled = '';
        } else {
            available = 'soldout';
            disabled = 'disabled';
        }
        if (saveParam.size == `swatch-0-${size}`) {
            checked = 'checked';
        } else {
            checked = '';
        }
        //  Значение размера: {size}. Доступность: {soldout/available} и {disabled}. Описание цвета: {sizeDescript}.
        const htmlSizeSwatch = (`<div data-value="${size}" class="swatch-element plain ${size} ${available}">
        <input id="swatch-0-${size}" type="radio" name="size" value="${size}" ${disabled}  ${checked}>
        <label for="swatch-0-${size}">${sizeDescript}<img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
        </label></div>`);
        toSizeSwatch.innerHTML += htmlSizeSwatch;
    }
}

function displayCartAndProduct(json) {
    let productId, imgSrc, titleProduct, amountProduct, dataId;
    let totalCost = 0;
    let open = 'open';
    if (json.length == 0) {
        open = '';
    }
    for (let data of json) {
        //data.color;
        productId = data.id;
        imgSrc = data.pic;
        //data.price;
        amountProduct = data.quantity;
        //data.size;
        titleProduct = data.title;
        //  Идентификатор товара: {productId}, {dataId}. URL изображения: {imgSrc}.
        //  Название товара: {titleProduct}. Количество товара: {amountProduct}.
        const htmlQuickCart = (`<div class="quick-cart-product quick-cart-product-static" id="${productId}" style="opacity: 1;">
        <div class="quick-cart-product-wrap"><img src="${imgSrc}" title="${titleProduct}">
        <span class="s1" style="background-color: #000; opacity: .5">$800.00</span><span class="s2"></span></div>
        <span class="count hide fadeUp" id="${productId}">${amountProduct}</span>
        <span class="quick-cart-product-remove remove" data-id="${productId}"></span></div>`);
        // Наличие товара в корзине (есть/нет класс) {open}. Общая стоимость {totalCost}.
        const htmlBasket = (`<a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico ${open}"><span>
        <strong class="quick-cart-text">Оформить заказ<br></strong>
        <span id="quick-cart-price">$${totalCost}</span></span></a>`);
        toQuickCart.innerHTML = htmlQuickCart + htmlBasket;
    }   
}