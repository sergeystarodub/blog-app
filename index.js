//=========================================================
// программа не публикует пост в ленту если пусто в поле заголовка или поле поста или там и там
// пост также не публикуется если в заголовке символов больше лимита заголовка а в поле поста больше лимита поста
// при этом выводятся предупреждающие сообщения о превышении лимита количества символов, сколько символов осталось до лимита, на сколько символов лимит превышен
// пока задал лимиты для заголовка 15 символов, для поста 30 символов, чтобы удобнее было тестировать
// лимиты сделал как data атрибуты в html
//=========================================================
const posts = [];
let titleInitialFlag = false;  // флажок для проверки валидности ввода в поле input
let textInitialFlag = false;   // флажок для проверки валидности ввода в поле textarea



const postTitleInputNode = document.querySelector('.js-post-title-input');
const postTextInputNode = document.querySelector('.js-post-text-input');
const newPostBtnNode = document.querySelector('.js-new-post-btn');
const postsNode = document.querySelector('.js-posts');
const warningTitleInputNode = document.querySelector('.js-warning-title-input');
const warningTextInputNode = document.querySelector('.js-warning-text-input');

const warningTitle = `Заголовок больше ${postTitleInputNode.dataset.maxLength} символов`;
const warningText = `Пост больше ${postTextInputNode.dataset.maxLength} символов`;


newPostBtnNode.addEventListener('click', function() {
    const postFromUser = getPostFromUser();

    let titleFlag = getTitleInitialFlag();
    let textFlag = getTextInitialFlag();

    inputValidationAddPost(titleFlag, textFlag, postFromUser);

    //это уже не надо - потом удалить
    //addPost(postFromUser);

    renderPosts();

});

postTitleInputNode.addEventListener('input', function() {
    const currentTitleFlag = permissionDisplayMessage(postTitleInputNode);
    setTitleInitialFlag(currentTitleFlag);
    const messageTitle = getWarningTitle();
    getWarning(messageTitle, warningTitleInputNode, postTitleInputNode);
   
});

postTextInputNode.addEventListener('input', function() {
    const currentTextFlag = permissionDisplayMessage(postTextInputNode);
    setTextInitialFlag(currentTextFlag);
    const messageText = getWarningText();
    getWarning(messageText, warningTextInputNode, postTextInputNode);
});

function getPostFromUser() {
    // пробую - так было раньше 
    /* const title = postTitleInputNode.value;
    const text = postTextInputNode.value; */
    // если перед заголовком и постом вводят лишние пробелы - в ленте они не отображаются - делается с помощью trim()
    const title = postTitleInputNode.value.trim();
    const text = postTextInputNode.value.trim();
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

function getTitleInitialFlag() {
    return titleInitialFlag;
}

function getTextInitialFlag() {
    return textInitialFlag;
}

function setTitleInitialFlag(currentTitleFlag) {
    titleInitialFlag = currentTitleFlag;
}

function setTextInitialFlag(currentTextFlag) {
    textInitialFlag = currentTextFlag;
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
    //trim() нужен чтобы пробел не учитывался как символ - если ввели только пробел
    const currentLength = postInputNode.value.trim().length;
    const maxLength = parseInt(postInputNode.dataset.maxLength);
    // проверка можно ли выводить сообщение - если длина сообщения больше чем заданная величина или ноль то нельзя выводить сообщение
    if (currentLength > maxLength || currentLength === 0) {
        // флажок означает что вывод запрещен - заголовок/пост либо не введен(ноль символов) либо превышает лимит символов
        currentFlag = false;
    } else {
        // флажок означает что вывод разрешен
        currentFlag = true;
    }
    
    return currentFlag;
}

// функция валидности сообщения - корректно для вывода или нет
function inputValidationAddPost(titleFlag, textFlag, postUser) {
    if (!(titleFlag === false || textFlag === false)) {
        addPost(postUser);
    }
}

//было так раньше - если получится то может быть потом удалить
// функция вывода предупреждения при переполнении поля ввода
/* function getWarning(warningMessage, warningInputNode, postInputNode) {
    const emptyWarningMessage = '';
    const currentLength = postInputNode.value.length;
    const maxLength = parseInt(postInputNode.dataset.maxLength);
    if (currentLength > maxLength) {
        warningInputNode.innerText = warningMessage;
    } else {
        warningInputNode.innerText = emptyWarningMessage;

    }
} */


function getWarning(warningMessage, warningInputNode, postInputNode) {
    //const emptyWarningMessage = '';
    //trim() делает строку без пробелов слева и справа если пробелы были введены - то есть учитываем длину строки без лишних пробелов по бокам
    const currentLength = postInputNode.value.trim().length;
    //const currentLength = postInputNode.value.length;

    const maxLength = parseInt(postInputNode.dataset.maxLength);
    if (currentLength > maxLength) {
        warningInputNode.innerText = warningMessage + ` - лимит превышен на ${currentLength - maxLength} символов`;
        warningInputNode.classList.remove('blog-item__warning_blue');

    } else if (currentLength <= maxLength && currentLength > 0) {
        warningInputNode.innerText = `${maxLength - currentLength} символов осталось до лимита`;
        warningInputNode.classList.add('blog-item__warning_blue');
    }
    else {
        //warningInputNode.innerText = emptyWarningMessage;
        warningInputNode.innerText = 'При пустом поле ввода и при превышении лимита пост не отправляется в ленту';
        warningInputNode.classList.remove('blog-item__warning_blue');

    }
}


