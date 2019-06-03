'use strict';
let body = document.querySelector('body');
let urls = {'Data': 'https://neto-api.herokuapp.com/food/42',
            'Rating': 'https://neto-api.herokuapp.com/food/42/rating',
            'Consumers': 'https://neto-api.herokuapp.com/food/42/consumers'};


// html интерфейс.
let picture = body.querySelector('.cover');
let title = picture.querySelector('font');
let ingredients = body.querySelector('.content tr').children[1];
let rating = body.querySelector('.content tr').lastElementChild.firstElementChild;
let star = body.querySelector('.content em');
let votes = body.querySelector('.content tr').lastElementChild.lastElementChild;
let consumers = body.querySelector('.content table tbody').lastElementChild.lastElementChild;

for (let url in urls) {
    let myScript = document.createElement('script');
    myScript.type="text/javascript";
    myScript.src = urls[url] + `?jsonp=display${url}`;
    body.appendChild(myScript);
}

function displayData(request) {
    picture.style.backgroundImage = 'url(https://neto-api.herokuapp.com/hj/4.1/food/product.jpg)';
    title.innerText = request.title;
    ingredients.innerText = request.ingredients.join(',');
}

function displayRating(request) {
    rating.innerText = request.rating.toFixed(2);
    star.style.width = request.rating * 10 + "px";
    votes.innerText = `${request.votes} оценок`;
}

function displayConsumers(request) {
    for (let consumer of request.consumers) {
        consumers.innerHTML += `<img src=${consumer.pic} title=${consumer.name}>`;
    }
    consumers.innerHTML += `<span>(+${request.total - request.consumers.length})</span>`;
}