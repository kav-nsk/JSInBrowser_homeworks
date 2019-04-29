'use strict'
const MUSICBUTTONS = document.getElementsByClassName('drum-kit__drum');

for (let i of MUSICBUTTONS) {
    i.onclick = () => {
        let newPlay = i.getElementsByTagName('audio')[0];
        newPlay.type = 'audio/wav';
        newPlay.play();
    }
}