import { Cliente } from "../models/Cliente.js";
import { Endereco } from "../models/Endereco.js";
import { Telefone } from "../models/Telefone.js";
import clienteRepository from "../repositories/clientesRepository.js";
import axios from "axios";

const clienteController = {
    criarCliente: async (req, res) => {
        try {
            const { nome, cpf, telefones, cep, numero, complemento } = req.body;
            const cepRegex = /^[0-9]{8}$/;
            if (!cepRegex.test(cep)) {
                return res.status(400).json({ message: 'Verifique o cep informado' });
            }
            const respApi = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

            if (respApi.data.erro) {
                throw new Error('Erro ao consultar o cep na API');
            }

            const logradouro = respApi.data.logradouro;
            const bairro = respApi.data.bairro;
            const cidade = respApi.data.localidade;
            const uf = respApi.data.uf;

            const cliente = Cliente.criar({ nome, cpf });
            const telefone = Telefone.criar({ telefone: telefones[0] });
            const endereco = Endereco.criar({ numero, logradouro, complemento, bairro, cidade, uf, cep });
            const result = await clienteRepository.criar(cliente, telefone, endereco);
            res.status(201).json({ result });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    },
    editarCliente: async (req, res) => {
    try {
        const id = req.params.id;
        const { nome, cpf, telefones, cep, numero, complemento } = req.body;

        const respApi = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        if (respApi.data.erro) {
            throw new Error('CEP inválido');
        }

        const cliente = {
            id,
            nome,
            cpf,
            telefone: telefones[0],
            numero,
            complemento,
            logradouro: respApi.data.logradouro,
            bairro: respApi.data.bairro,
            cidade: respApi.data.localidade,
            uf: respApi.data.uf,
            cep
        };

        const result = await clienteRepository.editar(cliente);

        res.status(200).json(result);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Ocorreu um erro no servidor',
            errorMessage: error.message
        });
    }
},
    deletarCliente: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await clienteRepository.deletar(id);
            res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    },
    selecionar: async (req, res) => {
        try {
            const result = await clienteRepository.selecionar();
            res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    }

}

export default clienteController;

async function consultaCep(cep) {
    try {
        const respApi = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        if (respApi.data.erro) {
            throw new Error('CEP não encontrado');
        }

        return respApi.data;
    } catch (error) {
        console.error(error)
        throw new Error('Erro ao buscar o CEP', error.message);
    }
}