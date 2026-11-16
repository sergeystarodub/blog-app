const posts = [];

const postTitleInputNode = document.querySelector('.js-post-title-input');
const postTextInputNode = document.querySelector('.js-post-text-input');
const newPostBtnNode = document.querySelector('.js-new-post-btn');
const postsNode = document.querySelector('.js-posts');

newPostBtnNode.addEventListener('click', function() {
    const postFromUser = getPostFromUser();

    addPost(postFromUser);

    renderPosts();

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

