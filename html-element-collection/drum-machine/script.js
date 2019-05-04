'use strict'
const MUSICBUTTONS = document.getElementsByClassName('drum-kit__drum');
const TRACS = document.getElementsByTagName('audio');

for (let i = 0; i != MUSICBUTTONS.length; i++) {
    MUSICBUTTONS[i].onclick = () => {
        TRACS[i].currentTime = 0;
        TRACS[i].play();
    }
}