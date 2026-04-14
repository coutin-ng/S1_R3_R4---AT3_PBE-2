export class Endereco {
    #id;
    #idCliente;
    #numero;
    #logradouro;
    #complemento;
    #bairro;
    #cidade;
    #uf;
    #cep;

    constructor(idCliente, numero, logradouro, complemento, bairro, cidade, uf, cep, id) {
        this.idCliente = idCliente;
        this.numero = numero;
        this.logradouro = logradouro;
        this.complemento = complemento;
        this.bairro = bairro;
        this.cidade = cidade;
        this.uf = uf;
        this.cep = cep;
        this.id = id;
    }

    // GETTERS / SETTERS
    get id() { return this.#id; }
    set id(value) { this.#validarId(value); this.#id = value; }

    get idCliente() { return this.#idCliente; }
    set idCliente(value) { this.#validarId(value); this.#idCliente = value; }

    get numero() { return this.#numero; }
    set numero(value) { this.#validarNumero(value); this.#numero = value; }

    get logradouro() { return this.#logradouro; }
    set logradouro(value) { this.#validarTexto(value, "logradouro"); this.#logradouro = value; }

    get complemento() { return this.#complemento; }
    set complemento(value) { this.#validarTexto(value, "complemento"); this.#complemento = value; }

    get bairro() { return this.#bairro; }
    set bairro(value) { this.#bairro = value; }

    get cidade() { return this.#cidade; }
    set cidade(value) { this.#validarTexto(value, "cidade"); this.#cidade = value; }

    get uf() { return this.#uf; }
    set uf(value) { this.#validarUF(value); this.#uf = value; }

    get cep() { return this.#cep; }
    set cep(value) { this.#validarCep(value); this.#cep = value; }

    // VALIDAÇÕES
    #validarId(value) {
        if (value && value <= 0) throw new Error('ID inválido');
    }

    #validarNumero(value) {
        if (!value || value <= 0) throw new Error('Número inválido');
    }

    #validarTexto(value, campo) {
        if (!value || value.trim().length < 2) {
            throw new Error(`Campo ${campo} inválido`);
        }
    }

    #validarUF(value) {
        if (!value || value.length !== 2) {
            throw new Error('UF deve ter 2 caracteres');
        }
    }

    #validarCep(value) {
        const cep = value.replace(/\D/g, '');
        if (cep.length !== 8) {
            throw new Error('CEP inválido');
        }
    }

    // FACTORY
    static criar(dados) {
        return new Endereco(
            null,
            dados.numero,
            dados.logradouro,
            dados.complemento,
            dados.bairro,
            dados.cidade,
            dados.uf,
            dados.cep,
            null
        );
    }

    static alterar(dados, id) {
        return new Endereco(
            dados.idCliente,
            dados.numero,
            dados.logradouro,
            dados.complemento,
            dados.bairro,
            dados.cidade,
            dados.uf,
            dados.cep,
            id
        );
    }
}