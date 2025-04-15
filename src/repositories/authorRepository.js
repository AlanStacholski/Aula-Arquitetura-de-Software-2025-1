import { BaseRepository } from "./baseRepository.js";
import author, { author } from "../models/Author.js";

export class AuthorRepository extends BaseRepository {
    constructor() {
        super(author);
    }

    searchByKeyword = async (keyword) => {
        return await this.model.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
            ],
        });
    };
}