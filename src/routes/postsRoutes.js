import express from "express";
import PostController from "../controllers/postController.js";//detalhe tá aqui...

const routes = express.Router();

routes.get("/posts", PostController.getAllPosts);
routes.post("/posts", PostController.createPost);
routes.get("/posts/search/:keyword", PostController.findPostByKeyword);
routes.get("/posts/:id", PostController.getPostById);
routes.put("/posts/:id", PostController.updatePost);
routes.delete("/posts/:id", PostController.deletePost);

export default routes;