export class AuthorDto {
    constructor(author) {
        this.id = author.id;
        this.name = author.name;
        this.email = author.email;
        this.createdAt = author.createdAt;
        this.updateAt = author.updateAt;
    }

    static fromRequest(body) {
        return {
            id: body.id,
            name: body.name,
            email: body.email,
        };
    }
}