const posts = [];

const postTitleInputNode = document.querySelector('.js-post-title-input');
const postTextInputNode = document.querySelector('.js-post-text-input');
const newPostBtnNode = document.querySelector('.js-new-post-btn');
const postsNode = document.querySelector('.js-posts');

newPostBtnNode.addEventListener('click', function() {
    const postFromUser = getPostFromUser();

    addPost(postFromUser);

    renderPosts();
    //checkEmptyInputRenderPosts();

});

postTitleInputNode.addEventListener('input', function() {
    let titleFlag = permissionDisplayMessage(postTitleInputNode);
    // проверка - потом удалить
    console.log('titleFlag ' + titleFlag);


    // если все заработает это удалить
    /* let currentFlag = false;
    const currentLength = postTitleInputNode.value.length;
    const maxLength = parseInt(postTitleInputNode.dataset.maxLength);
    // проверка потом удалить
    console.log(currentLength);
    console.log(maxLength);
    // проверка можно ли выводить сообщение - если длина сообщения больше чем заданная величина или ноль то нельзя выводить сообщение
    if (currentLength > maxLength || currentLength === 0) {
        currentFlag = false;
    } else {
        currentFlag = true;
    }
    
    // проверка - потом удалить
    console.log(currentFlag); */
});

function getPostFromUser() {
    const title = postTitleInputNode.value;
    const text = postTextInputNode.value;
    const date = getDate();

    return {
        title: title,
        text: text,
        date: date
    };
}

function addPost({title, text, date}) {
    posts.push({
        title,
        text,
        date
    });
}

function getPosts() {
    return posts;
}

function getDate() {
    const date = new Date();

    //Функция padStart(2, '0') гарантирует, что число всегда будет состоять минимум из двух символов, добавляя ноль в начало при необходимости
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // +1, так как месяцы с 0
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;

    return formattedDate;

}

function renderPosts() {
    const posts = getPosts();

    let postsHtml = '';

    posts.forEach(post => {
        postsHtml += `
            <div class='post'>
                <p class='post__date'>${post.date}</p>
                <p class='post__title'>${post.title}</p>
                <p class='post__text'>${post.text}</p>
            </div>
        `;
    });

    

    postsNode.innerHTML = postsHtml;
}

// функция разрешения на вывод сообщения
function permissionDisplayMessage(postInputNode) {
    let currentFlag = false;
    const currentLength = postInputNode.value.length;
    const maxLength = parseInt(postInputNode.dataset.maxLength);
    // проверка потом удалить
    console.log(currentLength);
    console.log(maxLength);
    // проверка можно ли выводить сообщение - если длина сообщения больше чем заданная величина или ноль то нельзя выводить сообщение
    if (currentLength > maxLength || currentLength === 0) {
        currentFlag = false;
    } else {
        currentFlag = true;
    }
    
    // проверка - потом удалить
    console.log(currentFlag);
    return currentFlag;
}

// функция пока работает не так как надо-она не выводит сразу пустые поля но потом когда поля заполнены выводит все что было до этого введенно так как сохранило все в структуре данных - подумать как их обнулить - пофиксить
// потом удалить если не буду использовать
/* function checkEmptyInputRenderPosts() {
    const posts = getPosts();
    
    posts.forEach(post => {
        if (post.title !== '' && post.text !== '') {
            renderPosts();
        }
    });
} */

