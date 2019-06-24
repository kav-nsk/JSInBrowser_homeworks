'use strict';
function createElement(content) {
    //createElement.elem - созданный элемент разметки.
    //createElement.chaild - потомок созданного элемента разметки.

    // Создаем новый элемент, если пришел объект без tagName.
    if (typeof content === 'object' && !content.tagName && content.nodeName !== '#text') {
        createElement.elem = document.createElement(content.name);

        if (content.props && typeof content.props === 'object') {
            // Заполняем классы.
            content.props.class.split(' ').forEach(i => {
                if (i !== '') {
                    createElement.elem.classList.add(i);
                } 
            });
        }
        //console.log(createElement.elem);
    } else if (typeof content === 'string') {
        let result = document.createTextNode(content);
        //console.log(result.nodeName);
        //createElement.elem = result;
        return result;
    }

    // Обращаемся к дочерним элементам.
    if (content.childs.length !== 0) {
        for (let i of content.childs) {

            console.log(i);

            createElement.chaild = createElement(i);

            //console.log(createElement.chaild);

            //createElement.elem.appendChild(createElement.chaild);

            //console.log(createElement.elem);
        }
    } else {
        createElement.elem.appendChild(createElement.chaild);
    }

    let result = createElement.elem;
    console.log(result);
    return result;
     /*
    if (createElement.chaild) {
        let result = createElement.elem.appendChild(createElement.chaild);
        console.log(result);
        return result;
    } else {
        console.log(createElement.elem);
        return createElement.elem;
    }*/

}