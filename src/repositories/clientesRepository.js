import { connection } from "../config/Database.js";

const clienteRepository = {
    criar: async (cliente, telefone, endereco) => {
        const conn = await connection.getConnection();

        try {
            await conn.beginTransaction();

            // Inserir cliente

            const sqlCliente = 'INSERT INTO clientes (nome, cpf) VALUES (?, ?);';
            const valuesCliente = [cliente.nome, cliente.cpf];
            const [rowsCliente] = await conn.execute(sqlCliente, valuesCliente);

            // Inserir telefones

            const sqlTelefone = 'INSERT INTO telefones (idCliente, telefone) VALUES (?, ?);';
            const valuesTelefone = [rowsCliente.insertId, telefone.telefone];
            const [rowsTelefone] = await conn.execute(sqlTelefone, valuesTelefone);

            // Inserir endereço

            const sqlEndereco = 'INSERT INTO enderecos (idCliente, numero, logradouro, complemento, bairro, cidade, uf, cep) VALUES (?, ?, ?, ?, ?, ?, ?, ?);';
            const valuesEndereco = [rowsCliente.insertId, endereco.numero, endereco.logradouro, endereco.complemento, endereco.bairro, endereco.cidade, endereco.uf, endereco.cep];
            const [rowsEndereco] = await conn.execute(sqlEndereco, valuesEndereco);

            await conn.commit();
            return { rowsCliente, rowsTelefone, rowsEndereco };

        } catch (error) {
            await conn.rollback();
            throw new Error(error);
        }
        finally {
            conn.release();
        }
    },

    editar: async (cliente) => {
        const conn = await connection.getConnection();

        try {
            await conn.beginTransaction();

            const sqlCliente = 'UPDATE clientes SET nome = ?, cpf = ? WHERE id = ?;';
            await conn.execute(sqlCliente, [cliente.nome, cliente.cpf, cliente.id]);

            const sqlTelefone = 'UPDATE telefones SET telefone = ? WHERE idCliente = ?;';
            await conn.execute(sqlTelefone, [cliente.telefone, cliente.id]);

            const sqlEndereco = `
            UPDATE enderecos 
            SET numero = ?, logradouro = ?, complemento = ?, bairro = ?, cidade = ?, uf = ?, cep = ?
            WHERE idCliente = ?;
        `;

            await conn.execute(sqlEndereco, [
                cliente.numero,
                cliente.logradouro,
                cliente.complemento,
                cliente.bairro,
                cliente.cidade,
                cliente.uf,
                cliente.cep,
                cliente.id
            ]);

            await conn.commit();

            return { message: "Cliente atualizado com sucesso" };

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    deletar: async (id) => {
        const conn = await connection.getConnection();

        try {
            await conn.beginTransaction();

            const sqlTelefone = 'DELETE FROM telefones WHERE idCliente = ?;';
            await conn.execute(sqlTelefone, [id]);

            const sqlEndereco = 'DELETE FROM enderecos WHERE idCliente = ?;';
            await conn.execute(sqlEndereco, [id]);

            const sqlCliente = 'DELETE FROM clientes WHERE id = ?;';
            const [rowsCliente] = await conn.execute(sqlCliente, [id]);

            await conn.commit();

            return rowsCliente;

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    selecionar: async () => {
        const sql = `SELECT clientes.*, telefones.*, enderecos.*
         FROM clientes
         INNER JOIN telefones ON clientes.id = telefones.idCliente
         INNER JOIN enderecos ON clientes.id = enderecos.idCliente`;

        const [rows] = await connection.execute(sql);

        return [rows];
    }
};

export default clienteRepository;