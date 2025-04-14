//import post from "../models/Post.js";
import { PostService } from "../services/postService.js";
import { PostDto } from "../dtos/postDto.js";

class PostController {
    postService = new PostService();

    getAllPosts = async (req, res) => {
        try {
            const posts = await this.postService.getAllPosts();
            res.status(200).json(posts);
        }
        catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    }

    createPost = async (req, res) => {
        try {
            const createPost = await this.postService.createPost(req.body);
            res.status(201).json({
                message: "Post criado com sucesso!",
                post: new PostDto(createPost),
            });
        }
        catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    }

    getPostById = async(req, res) => {
        try {
            const id = req.params.id;
            //const fountPost = await post.findById(id) -> COMO ERA ANTES;
            const foundPost = await this.postService.getPostById(id);
            if (!foundPost) {
                return res.status(404).send("Post não encontrado!");
            }
            //res.status(200).json(foundPost) -> COMO ERA ANTES;
            res.status(200).json(new PostDto(foundPost));
        }catch (error) {
            res.status(500).send(error.message);
        }
    }

    updatePost = async(req, res) => {
        try {
            const id = req.params.id;
            const updatePost = await this.postService.updatePost(id, req.body, {
                new: true
            });
            res.status(200).json({
                message: "Post atualizado com sucesso!",
                // post: updatePost
                post: new PostDto(updatePost),
            });
        } catch (error) {
            res.status(500).send(error.message);
        }

    }




    /** 
        static async getAllPosts(req, res) {
            try {
                const listPosts = await post.find({});
                res.status(200).json(listPosts);
            } catch (error) {
                res.status(500).send(error.message);
            }
        };
    
        static async createPost(req, res) {
            try {
                //posts.push(req.body);
                const newPost = new post(req.body);
                await newPost.save();
                res.status(201).json({
                    message: "Post criado com sucesso!",
                    post: newPost,
                });
            } catch (error) {
                res.status(500).send(error.message);
            }
        };
    
        static async getPostById(req, res) {
            try {
                const id = req.params.id;
                const foundPost = await post.findById(id);
                if (!foundPost) {
                    return res.status(404).send("Post não encontrado!");
                }
                res.status(200).json(foundPost);
            } catch (error) {
                res.status(500).send(error.message);
            }
        }
    
        static async updatePost(req, res) {
            try {
                const id = req.params.id;
                const updatePost = await post.findByIdAndUpdate(id, req.body, {
                    new: true
                });
                if (!updatePost) {
                    return res.status(404).send("Post não encontrado!");
                }
                res.status(200).json({
                    message: "Post atualizado com sucesso!",
                    post: updatePost
                });
            } catch (error) {
                res.status(500).send(error.message);
            }
        }
    
        static async deletePost(req, res) {
            try {
                const id = req.params.id;
                const deletedPost = await post.findByIdAndDelete(id);
                if (!deletedPost) {
                    return res.status(404).send("Post não encontrado!");
                }
                res.status(200).send("Post removido com sucesso!");
            } catch (error) {
                res.status(500).send(error.message);
            }
        }
    
        static async findPostByKeyword(req, res) {
            try {
                const { keyword } = req.params;
                const result = await post.find({
                    $or: [
                        { title: { $regex: keyword, $options: "i" } },
                        { description: { $regex: keyword, $options: "i" } },
                    ]
                });
                if (result.length === 0) {
                    return res.status(404).json({
                        message: "Nenhum post encontrato com a palavra-chave informada",
                    })
                }
                res.status(200).json(result);
            } catch (error) {
                res.status(500).send(error.message);
            }
        }
    */

}

export default new PostController();