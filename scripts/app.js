import PostList from './post.js';

class UI {

    constructor() {

    }

    displayAllPosts(list) {
        const listElement = document.querySelector('.posts__list');
        listElement.innerHTML = '';

        list.map(item => {
            const li = document.createElement('li');
            li.className = 'posts__item';
            li.innerHTML = `
                <h3>${item.id}.${item.title}</>
                <p>${item.body}</p>
                <p>Posted by user with Id: ${item.userId}</p>
            `;
            li.dataset.id = item.id;
            listElement.append(li);
        })
    }

    displayErrorMessage(message) {
        const listElement = document.querySelector('.posts__list');
        listElement.innerHTML = '';
        const p = document.createElement('p');
        p.textContent = message.toString();
        listElement.append(p);
    }

    removePost(id) {
        list.list = list.list.filter(item => item.id != id);
        ui.displayAllPosts(list.list);
    }
}

const ui = new UI();
const list = new PostList();

const loadList = async () => {
    list.getAll()
        .then(() => ui.displayAllPosts(list.list));
}

const searchOne = async () => {
    const postId = document.querySelector('.posts__input').value;
    list.getById(postId)
        .then(() => ui.displayAllPosts(list.list))
        .catch(err => ui.displayErrorMessage(err))

}

async function deletePost(event) {
    const parent = event.target.closest('.posts__item');
    if (parent) {
        ui.removePost(parent.dataset.id);
        list.deleteById(parent.dataset.id);
    }
}

document.querySelector('.posts__load-all').addEventListener('click', loadList)
document.querySelector('.posts__search').addEventListener('click', searchOne)
document.querySelector('.posts__list').addEventListener('click', deletePost)