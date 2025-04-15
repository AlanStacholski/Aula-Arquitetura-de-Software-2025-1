import { PostRepository } from "../repositories/postRepository.js";
import { PostDto } from "../dtos/postDto.js";
import { author } from "../models/Author.js";


export class PostService {
    postRepository = new PostRepository();
    getAllPosts = async () => {
        return await this.postRepository.findAll();
    }
    createPost = async (postData) => {
        const foundAuthor = await author.findById(postData.author);
        if (!foundAuthor) {
            throw new Error("Author não encontrado!");
        }
        const completePost = {
            ...PostDto.fromRequest(postData),
            author: { ...foundAuthor._doc },
        }
        return await this.postRepository.create(completePost);
    }
    getPostById = async (id) => {
        const post = await this.postRepository.findById(id);
        if (!post) {
            throw new Error("Post não encontrado!");
        }
        return post;
    }
    
    // Iniciando a partir daqui...

    updatePost = async (id, postData) => {
        let updateData = {...postData};

        if (postData.author) {
            const foundAuthor = await author.findById(postData.author);
            if (!foundAuthor) {
                throw new Error("Author não encontrado");
            }
            updateData.author = {...foundAuthor._doc};
        }

        const updatePost = this.postRepository.update(id, updateData);
        if (!updatePost) {
            throw new Error("Post não encontrado!");
        }
        return updatePost;
    }
    
    deletePost = async (id) => {
        const deletePost = await this.postRepository.delete(id);
        if (!deletePost) {
            throw new Error("Post não encontrado!");
        }
        return this.deletePostost;
    }
}