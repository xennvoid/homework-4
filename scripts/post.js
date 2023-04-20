import { ServerError } from "./error.js";

class Post {

    constructor(userId, id, title, body) {
        this.userId = userId;
        this.id = id;
        this.title = title;
        this.body = body;
    }

}

export default class PostList {

    constructor() {
        this.start = 0;
        this.list = []
    }

    async getAll() {

        this.list = [];

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=20`);
            const data = await response.json();

            data.map(post => {
                const postObj = new Post(post.userId, post.id, post.title, post.body);
                this.list.push(postObj);
            });
        }
        catch (e) {
            throw new ServerError(e.message, response.status);
        }
    }

    async getById(id) {

        if (!id) {
            throw new Error("Id is not valid!")
        }

        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

        if (response.status !== 200) {
            throw new ServerError("Post number is not valid! Min value = 1, max value = 100!", response.status)
        }

        const data = await response.json();

        const postObj = new Post(data.userId, data.id, data.title, data.body);
        this.list = [postObj];

    }

    async deleteById(id) {

        if (!id) {
            throw new Error("Id is not valid!")
        }

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { method: 'DELETE' });

            if (response.status !== 200) {
                throw new ServerError("Post number is not valid! Min value = 1, max value = 100!", response.status)
            }
        }
        catch (e) {
            throw new ServerError(e.message, response.status);
        }

    }

}