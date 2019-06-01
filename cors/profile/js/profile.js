'use strict';
let body = document.querySelector('body');

// html интерфейс.
let img = document.querySelector('.firstinfo img');
let name = document.querySelector('.profileinfo h1');
let position = document.querySelector('.profileinfo h3');
let description = document.querySelector('.profileinfo .bio');
let technologies = document.querySelector('.badgescard');


function displayProfile(response) {
    img.src = response.pic;
    name.innerText = response.name;
    description.innerText = response.description;
    position.innerText = response.position;

    let myScriptForQuerySkills = document.createElement('script');
    body.appendChild(myScriptForQuerySkills);
    myScriptForQuerySkills.type = 'text/javascript';
    myScriptForQuerySkills.src = `https://neto-api.herokuapp.com/profile/${response.id}/technologies?jsonp=displaySkills`;
}

function displaySkills(response) {
    for (let skill of response) {
        technologies.innerHTML += `<span class="devicons devicons-${skill}"></span>`;
    }
    document.querySelector('.content').setAttribute('style', 'display: initial');
}


// Получение данных через дополнительные script.
let myScriptForQueryProfile = document.createElement('script');
body.appendChild(myScriptForQueryProfile);
myScriptForQueryProfile.type = 'text/javascript';
myScriptForQueryProfile.src = 'https://neto-api.herokuapp.com/profile/me?jsonp=displayProfile';