import { connection } from "../config/Database.js";

const produtoRepository={
    criar: async (produto) => {
        const sql = 'INSERT INTO produtos (idCategoria, nome, valor, caminhoImagem) VALUES (?,?,?,?);';
        const values = [produto.idCategoria, produto.nome, produto.valor, produto.caminhoImagem];
        const [rows] = await connection.execute(sql, values);
        return rows;
    },
    editar: async (produto) => {
        const sql = 'UPDATE produtos SET idCategoria =?, nome =?, valor=? WHERE id=?;';
        const values = [produto.idCategoria, produto.nome, produto.valor, produto.id];
        const [rows] = await connection.execute(sql, values);
        return rows;
    },
    deletar: async (id) => {
        const sql = 'DELETE FROM produtos WHERE id=?;';
        const values = [id];
        const [rows] = await connection.execute(sql, values);
        return rows;
    },
    selecionar: async () => {
        const sql = 'SELECT * FROM produtos;';
        const [rows] = await connection.execute(sql);
        return rows;
    }
}

export default produtoRepository;