'use strict'

let contactsList = document.getElementsByClassName('contacts-list')[0]; // Элемент списка контактов.
let contactsData = JSON.parse(loadContacts());  // Данные для заполнения контакта.

contactsList.innerHTML = ''; // Затрем пример.

for (let item of contactsData) {
    contactAdd(item);
}


function contactAdd(data) {
    contactsList.innerHTML += '<li><strong></strong></li>'; // Впишем пустую заготовку <li>.
    let newContact = contactsList.querySelector('li:last-child'); // Работаем с последним из <li>.
    newContact.dataset.email = data.email;
    newContact.dataset.phone = data.phone;
    newContact.querySelector('strong').innerHTML = data.name;   // Впишем имя в <strong>.
    return;
}