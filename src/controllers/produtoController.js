import { Produto } from "../models/Produto.js";
import produtoRepository from "../repositories/produtoRepository.js";

const produtoController = {
    criar: async (req, res) => {
        try {
            console.log(req.body)
            const { idCategoria, nome, valor } = req.body;
            const caminhoImagem = `/uploads/${req.file.filename}`
            const produto = Produto.criar({ idCategoria, nome, valor, caminhoImagem });
            const result = await produtoRepository.criar(produto);
            res.status(201).json({ result });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    },
    editar: async (req, res) => {
        try {
            const id = req.params.id;
            const { idCategoria, nome, valor, caminhoImagem } = req.body;
            const produto = Produto.alterar({ idCategoria, nome, valor, caminhoImagem }, id);
            const result = await produtoRepository.editar(produto);
            res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    },
    deletar: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await produtoRepository.deletar(id)
            res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    },
    selecionar: async (req, res) => {
        try {
            const result = await produtoRepository.selecionar()
            res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    }
}

export default produtoController;