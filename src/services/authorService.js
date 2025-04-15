import { author } from "../models/Author.js";
import { AuthorDto } from "../dtos/authorDto.js";

export class AuthorService {
    
    async getAllAuthors() {
        const authors = await author.find({});
        return authors.map(a => new AuthorDto(a)); 
    }

    async createAuthor(authorData) {
        const newAuthor = new author(authorData);
        await newAuthor.save();
        return new AuthorDto(newAuthor);
    }

    async getAuthorById(id) {
        const foundAuthor = await author.findById(id);
        if (!foundAuthor) {
            throw new Error("Autor não encontrado!");
        }
        return new AuthorDto(foundAuthor);
    }

    async updateAuthor(id, authorData) {
        const updatedAuthor = await author.findByIdAndUpdate(id, authorData, {
            new: true
        });
        if (!updatedAuthor) {
            throw new Error("Autor não encontrado!");
        }
        return new AuthorDto(updatedAuthor);
    }

    async deleteAuthor(id) {
        const deletedAuthor = await author.findByIdAndDelete(id);
        if (!deletedAuthor) {
            throw new Error("Autor não encontrado!");
        }
        return new AuthorDto(deletedAuthor);
    }

    async findAuthorByName(name) {
        const result = await author.find({
            $or: [
                { name: { $regex: name, $options: "i" } },
            ]
        });
        if (result.length === 0) {
            throw new Error("Nenhum autor encontrado com o nome+e-mail informado");
        }

        return result.map(a => new AuthorDto(a));
    }
}
