'use strict'
const MUSICBUTTONS = document.getElementsByClassName('drum-kit__drum');

for (let i of MUSICBUTTONS) {
    i.onclick = () => {
        i.getElementsByTagName('audio')[0].play();
    }
}