const posts = [];
let titleFlag = false;  // флажок для проверки валидности ввода в поле input
let textFlag = false;   // флажок для проверки валидности ввода в поле textarea
const warningTitle = 'Заголовок больше 100 символов';
const warningText = 'Пост больше 200 символов';

const postTitleInputNode = document.querySelector('.js-post-title-input');
const postTextInputNode = document.querySelector('.js-post-text-input');
const newPostBtnNode = document.querySelector('.js-new-post-btn');
const postsNode = document.querySelector('.js-posts');
const warningTitleInputNode = document.querySelector('.js-warning-title-input');
const warningTextInputNode = document.querySelector('.js-warning-text-input');


newPostBtnNode.addEventListener('click', function() {
    const postFromUser = getPostFromUser();

    inputValidationAddPost(titleFlag, textFlag, postFromUser);
    //addPost(postFromUser);

    renderPosts();

});

postTitleInputNode.addEventListener('input', function() {
    titleFlag = permissionDisplayMessage(postTitleInputNode);
    messageTitle = getWarningTitle();
    getWarning(messageTitle, warningTitleInputNode, postTitleInputNode);
   
});

postTextInputNode.addEventListener('input', function() {
    textFlag = permissionDisplayMessage(postTextInputNode);
    messageText = getWarningText();
    getWarning(messageText, warningTextInputNode, postTextInputNode);
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

function getWarningTitle() {
    return warningTitle;
}

function getWarningText() {
    return warningText;
}

function renderPosts() {
    const posts = getPosts();
    let postsHtml = '';
    // когда массив пустой - ввод не валидный - будет выводится строка 'Тут пока пусто...'
    if (posts.length === 0) {
        postsHtml = 'Тут пока пусто...';
    }
    

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
        // флажок означает что вывод запрещен - заголовок/пост либо не введен(ноль символов) либо превышает лимит символов
        currentFlag = false;
    } else {
        // флажок означает что вывод разрешен
        currentFlag = true;
    }
    
    // проверка - потом удалить
    console.log(currentFlag);
    return currentFlag;
}

// функция валидности сообщения - корректно для вывода или нет
function inputValidationAddPost(titleFlag, textFlag, postUser) {
    if (!(titleFlag === false || textFlag === false)) {
        addPost(postUser);
    }
}

// нужно доработать функцию - предупреждение выводит но его не убирает когда уменьшаю символы
// функция вывода предупреждения при переполнении поля ввода
function getWarning(warningMessage, warningInputNode, postInputNode) {
    //message = getWarning(warningMessage);
    const currentLength = postInputNode.value.length;
    const maxLength = parseInt(postInputNode.dataset.maxLength);
    if (currentLength > maxLength) {
        warningInputNode.innerText = warningMessage;
    }
}



