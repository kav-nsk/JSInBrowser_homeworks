'use strict';

// html интерфейс.
let wallpaper = document.querySelector('img.bg');
let username = document.querySelector('.desc').firstElementChild;
let description = document.querySelector('.desc').lastElementChild;
let picAvatar = document.querySelector('img.avatar');

let dataCont = document.querySelectorAll('.data li');
let numTweets = dataCont[0];
let numFollowers = dataCont[1];
let numFollowing = dataCont[2];

// Получение данных через дополнительный script
// и функцию с параметром - объектом данных.
let myScript = document.createElement('script');
document.querySelector('.container').appendChild(myScript);
myScript.src = 'https://neto-api.herokuapp.com/twitter/jsonp?jsonp=displayData';


function displayData(dataObj) {
    username.innerText = dataObj.username;
    description.innerText = dataObj.description;
    wallpaper.src = dataObj.wallpaper;
    picAvatar.src = dataObj.pic;
    numTweets.innerText = dataObj.tweets;
    numFollowers.innerText = dataObj.followers;
    numFollowing.innerText = dataObj.following;
}