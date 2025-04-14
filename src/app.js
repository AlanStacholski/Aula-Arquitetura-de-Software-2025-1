import express from "express";
import connectToDatabase from "./config/dbConnect.js";
import post from "./models/Post.js";
import routes from "./routes/index.js";

const connection = await connectToDatabase();

connection.on("error", (error) => {
    console.error("Erro de conexão", error);
});

connection.once("open", () => {
    console.log("Conexão com o banco realizada com sucesso!");
});

const app = express();
routes(app);

app.use(express.json());

// app.get("/", (req, res) => {
//     res.status(200).send("API com Node e Express.js");
// });

//Get all posts
// app.get("/posts", async (req, res) => {
//     try {
//         const listPosts = await post.find({});
//         res.status(200).json(listPosts);
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// });

//Create new post
// app.post("/posts", async (req, res) => {
//     try {
//         //posts.push(req.body);
//         const newPost = new post(req.body);
//         await newPost.save();
//         res.status(201).json({
//             message: "Post criado com sucesso!",
//             post: newPost,
//         });
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// });

//Get post by ID
// app.get("/posts/:id", async (req, res) => {
//     try {
//         const postById = await post.findById(req.params.id);
//         if (!postById) {
//             return res.status(404).send("Post não encontrado!");
//         }
//         res.status(200).json(postById);
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// });

//Delete post by ID
app.delete("/posts/:id", async (req, res) => {
    try {
        const deletedPost = await post.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).send("Post não encontrado!");
        }
        res.status(200).send("Post removido com sucesso!");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//Update post by ID
// app.put("/posts/:id", async (req, res) => {
//     try {
//         const updatePost = await post.findByIdAndUpdate(req.params.id, req.body, {
//             new: true,
//         });
//         if (!updatePost) {
//             return res.status(404).send("Post não encontrado!");
//         }
//         res.status(200).json(updatePost);
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// });

export default app;
