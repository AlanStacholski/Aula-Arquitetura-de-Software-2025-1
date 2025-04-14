import mongoose from "mongoose";
import { authorSchema } from "./Author.js";

const postSchema = new mongoose.Schema({
    // id: { type: mongoose.Schema.Types.ObjectId },
    title: {
        type: String,
        required: [true, "O título é obrigatório"],
    },
    description: { type: String },
    author: authorSchema,
}, {
    versionKey: false,
    timestamps: true,
});

const post = mongoose.model("posts", postSchema);
export default post;