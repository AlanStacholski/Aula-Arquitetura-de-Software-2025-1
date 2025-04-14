import express from "express";
import posts from "./postsRoutes.js";
import authors from "./authorRoutes.js";

const routes = (app) => {

    // app.get("/", (req, res) => {
    //     res.status(200).send("API com Node e Express.js");
    // });

    app.route("/").get((req, res) => res.status(200).send("API com Node e Express.js"));
    
    app.use(express.json(), posts, authors);
};

export default routes;