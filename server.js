import "dotenv/config";
//import http from "http";
import app from "./src/app.js";

const PORT = 3000;

const rotas = {
    "/": "API com Node e Express.js",
    "/posts": "Rota de postagens",
    "/autores": "Rota de autores",
}

// const server = http.createServer((req, res) => {
//     res.writeHead(200, { "Content-Type": "text/plain" });
//     res.end(rotas[req.url]);
// });

// server.listen(PORT, () => {
//     console.log("Servidor na escuta!");
// });

app.listen(PORT, () => {
    console.log("Servidor na escuta!");
});