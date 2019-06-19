'use strict';
function createElement(content) {
    let elem;
    // Создаем новый элемент, если пришел объект без tagName.
    if (typeof content === 'object' && !content.tagName) {
        elem = document.createElement(content.name);
        if (content.props && typeof content.props === 'object') {
            elem.classList.add(content.props.class);
        }
        console.log(elem);
        content.childs.forEach(i => {
            console.log(i);
            createElement(i);
        });
    }
    // Если в дочерних элементах массив -> создаем и возвращаем текстовый узел.
    if (typeof content === 'string') {
        console.log(content);
        let result = document.createTextNode(content);
        console.log(result);
        return result;
    }
    
    console.log(elem, content);
    let result = elem.appendChild(content);
    console.log(result);
    return result;
}


    /*
    if (typeof content === 'string') {
        console.log(content);
        return document.createTextNode(content);
    } else 
    // Объект.
    if (content.name && typeof content.name === 'string') {
        elem = document.createElement(content.name);
    }
    
    // Свойства.
    if (content.props && typeof content.props === 'object') {
        elem.classList.add(content.props.class);
    }
    // Дочерние элементы.
    if (content.childs && typeof content.childs === 'array') {
        content.childs.forEach(child => {
            createElement(child);
        });
    }
    //elem.appendChild(createElement(child));

    console.log(elem);
    return elem;
    */