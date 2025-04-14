export class PostDto {
    constructor(post) {
        this.id = post.id;
        this.title = post.title;
        this.description = post.description;
        this.author = post.author;
        this.createdAt = post.createdAt;
        this.updateAt = post.updateAt;
    }

    static fromRequest(body) {
        return {
            title: body.title,
            description: body.description,
            author: body.author
        };
    }
}