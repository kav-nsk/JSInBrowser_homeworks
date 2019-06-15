'use strict'
// html - интерфейс.
    // Кнопки.
const btnSeatMap = document.getElementById('btnSeatMap');
const btnSetFull = document.getElementById('btnSetFull');
const btnSetEmpty = document.getElementById('btnSetEmpty');
    // Селектор выбора самолета.
const typeJetSelector = document.getElementById('acSelect');
    // Текстовые поля.
const seatTotNum = document.getElementById('totalPax');
const seatAdultTotNum = document.getElementById('totalAdult');
const seatHalfTotNum = document.getElementById('totalHalf');
const typeJet = document.getElementById('seatMapTitle');
    // Область изображения салона.
//const seatMap = document.getElementById('seatMapDiv');
let seatMap;

// Глобально.
let saloonMapJet;   // Принятый объект салона самолета.


// Назначение обработчиков событий.
btnSeatMap.parentElement.addEventListener('click', getSaloonMapJet);
btnSetFull.addEventListener('click', setFull);
btnSetEmpty.addEventListener('click', setEmpty);

// Основной скрипт.
btnSetFull.disabled = true;
btnSetEmpty.disabled = true;
displaySeatInform();


function getSaloonMapJet(event) {
    event.preventDefault();
    let response = new XMLHttpRequest();

    response.addEventListener('load', function () {
        saloonMapJet = JSON.parse(response.responseText);
        btnSetFull.disabled = false;
        btnSetEmpty.disabled = false;

        displayTypeJet();

        seatMap = document.getElementById('seatMapDiv');
        seatMap.removeChild(seatMap.children[0]); // Удалить исходную надпись.
        // Стираем предыдущую схему.
        if (seatMap.children.length) {
            seatMap.querySelectorAll('.seating-row').forEach((i) => {
                i.remove();
            });
            displaySeatInform();
        }

        displaySaloon();
    });

    response.open('GET', 'https://neto-api.herokuapp.com/plane/' + typeJetSelector.value);
    response.send();

    function displayTypeJet() {
        typeJet.innerText = saloonMapJet.title + ` (${saloonMapJet.passengers} пассажиров)`;
    }

    function displaySaloon() {
        //Проход по рядам салона.
        for (let i = 0;  i < saloonMapJet.scheme.length; i++) {
            let numSeat = saloonMapJet.scheme[i];
            let row = document.createElement('div');
            row.classList = 'row seating-row text-center';
            let rowNumber = document.createElement('div');
            rowNumber.classList = 'col-xs-1 row-number';
            rowNumber.appendChild(document.createElement('h2'));
            rowNumber.firstChild.innerText = i + 1;
            row.appendChild(rowNumber);
            // Заполнение мест по левому борту.
            let leftSide = document.createElement('div');
            leftSide.className = 'col-xs-5';
                // Пропуск места для схожести картинки с настоящей планировкой салона.
            if (numSeat === 4) {
                let seat = document.createElement('div');
                seat.classList = 'col-xs-4 no-seat';
                leftSide.appendChild(seat);
            }
            for (let j = 0; j < numSeat / 2; j++) {
                let seat = document.createElement('div');
                seat.classList = 'col-xs-4 seat';
                let seatLabel = document.createElement('span');
                seatLabel.className = 'seat-label';
                seatLabel.innerText = saloonMapJet['letters' + numSeat][j];
                seat.addEventListener('click', selectSeat);
                seat.appendChild(seatLabel);
                leftSide.appendChild(seat);
            }
            row.appendChild(leftSide);
            // Заполнение мест по правому борту.
            let rightSide = document.createElement('div');
            rightSide.className = 'col-xs-5';
            for (let j = numSeat / 2; j < numSeat; j++) {
                let seat = document.createElement('div');
                seat.classList = 'col-xs-4 seat';
                let seatLabel = document.createElement('span');
                seatLabel.className = 'seat-label';
                seatLabel.innerText = saloonMapJet['letters' + numSeat][j];
                seat.addEventListener('click', selectSeat);
                seat.appendChild(seatLabel);
                rightSide.appendChild(seat);
            }
            row.appendChild(rightSide);

            seatMap.appendChild(row); 
        }
    }
}

function selectSeat(event) {
    event.preventDefault();
    // После отладки заменить на ALT.
    if (!event.altKey) {
        event.currentTarget.classList.remove('half');
        event.currentTarget.classList.toggle('adult');
    } else {
        event.currentTarget.classList.toggle('half');
        event.currentTarget.classList.remove('adult');
    }
    displaySeatInform();
}

function setFull(event) {
    event.preventDefault();
    var seats = document.querySelectorAll('.seat');
    seats.forEach((elem) => {
        if (!(elem.classList.contains('half') || elem.classList.contains('adult'))) {
            elem.classList.add('adult');
        }
    });
    displaySeatInform();
}

function setEmpty(event) {
    event.preventDefault();
    var seats = document.querySelectorAll('.seat');
    seats.forEach((elem) => {
        elem.classList = 'col-xs-4 seat';
    });
    displaySeatInform();
}

function displaySeatInform() {
    let adultTotNum = 0;
    let halfTotNum = 0;
    var seats = document.querySelectorAll('.seat');
    seats.forEach((elem) => {
        if (elem.classList.contains('adult')) {
            adultTotNum ++;
        } else if (elem.classList.contains('half')) {
            halfTotNum ++;
        };
    });
    seatAdultTotNum.innerText = adultTotNum;
    seatHalfTotNum.innerText = halfTotNum;
    seatTotNum.innerText = adultTotNum + halfTotNum;
}