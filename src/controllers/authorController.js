import { author } from "../models/Author.js";

class AuthorController {
    static async getAllAuthors(req, res) {
        try {
            const listAuthor = await author.find({});
            res.status(200).json(listAuthor);
        } catch (error) {
            res
                .status(500)
                .json({ message: `${error.message} - falha na requisição` });
        }
    };

    static async createAuthor(req, res) {
        try {
            const newAuthor = new author(req.body);
            await newAuthor.save();
            res.status(201).json({
                message: "Author criado com sucesso!",
                author: newAuthor,
            });
        } catch (error) {
            res
                .status(500)
                .json({ message: `${error.message} - falha ao cadastrar autor` });
        }
    };

    static async getAuthorById(req, res) {
        try {
            const id = req.params.id;
            const foundAuthor = await author.findById(id);
            if (!foundAuthor) {
                return res.status(404).send("Autor não encontrado!");
            }
            res.status(200).json(foundAuthor);
        } catch (error) {
            res
                .status(500)
                .json({ message: `${error.message} - falha na requisição` });
        }
    }

    static async updateAuthor(req, res) {
        try {
            const id = req.params.id;
            const updateAuthor = await author.findByIdAndUpdate(id, req.body, {
                new: true
            });
            if (!updateAuthor) {
                return res.status(404).send("Autor não encontrado!");
            }
            res.status(200).json({
                message: "Autor atualizado com sucesso!",
                author: updateAuthor
            });
        } catch (error) {
            res
                .status(500)
                .json({ message: `${error.message} - falha na atualização do autor` });
        }
    }

    static async deleteAuthor(req, res) {
        try {
            const id = req.params.id;
            const deletedAuthor = await author.findByIdAndDelete(id);
            if (!deletedAuthor) {
                return res.status(404).send("Autor não encontrado!");
            }
            res.status(200).send("Autor removido com sucesso!");
        } catch (error) {
            res
                .status(500)
                .json({ message: `${error.message} - falha na exclusão do autor` });
        }
    }

    static async findAuthorByName(req, res) {
            try {
                const { name } = req.params;
                const result = await author.find({
                    $or: [
                        { name: { $regex: name, $options: "i" } },
                        { email: { $regex: name, $options: "i" } },
                    ]
                });
                if (result.length === 0) {
                    return res.status(404).json({
                        message: "Nenhum autor encontrado com o nome+e-mail informado",
                    })
                }
                res.status(200).json(result);
            } catch (error) {
                res.status(500).send(error.message);
            }
        }
}

export default AuthorController;