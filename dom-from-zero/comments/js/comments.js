'use strict';

function showComments(list) {
  list.forEach(element => {
    const commentsContainer = document.querySelector('.comments');

    let commentWrap = document.createElement('div');
    commentWrap.className = 'comment-wrap';

    let photo = document.createElement('div');
    photo.className = 'photo';
    photo.setAttribute('title', `${element.author.name}`);

    let avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.style = `background-image: url('${element.author.pic}')`;

    let commentBlock = document.createElement('div');
    commentBlock.className = 'comment-block';

    let commentText = document.createElement('p');
    commentText.className = 'comment-text';
    commentText.innerText = element.text;

    let bottomComment = document.createElement('div');
    bottomComment.className = 'bottom-comment';

    let commentDate = document.createElement('div');
    commentDate.className = 'comment-date';
    commentDate.innerText = new Date(element.date).toLocaleString('ru-Ru');

    let commentActions = document.createElement('ul');
    commentActions.className = 'comment-actions';

    let complain = document.createElement('li');
    complain.className = 'complain';
    complain.innerText = 'Пожаловаться';

    let reply = document.createElement('li');
    reply.className = 'reply';
    reply.innerText = 'Ответить';

    commentWrap.appendChild(photo);
    photo.appendChild(avatar);
    commentWrap.appendChild(commentBlock);
    commentBlock.appendChild(commentText);
    commentBlock.appendChild(bottomComment);
    bottomComment.appendChild(commentDate);
    bottomComment.appendChild(commentActions);
    commentActions.appendChild(complain);
    commentActions.appendChild(reply);

    commentsContainer.appendChild(commentWrap);
  });
  
  //const comments = list.map(createComment).join('');
  //commentsContainer.innerHTML += comments;
}

function createCommentOld(comment) {
  return `<div class="comment-wrap">
    <div class="photo" title="${comment.author.name}">
      <div class="avatar" style="background-image: url('${comment.author.pic}')"></div>
    </div>
    <div class="comment-block">
      <p class="comment-text">
        ${comment.text.split('\n').join('<br>')}
      </p>
      <div class="bottom-comment">
        <div class="comment-date">${new Date(comment.date).toLocaleString('ru-Ru')}</div>
        <ul class="comment-actions">
          <li class="complain">Пожаловаться</li>
          <li class="reply">Ответить</li>
        </ul>
      </div>
    </div>
  </div>`
}

fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then(showComments);
