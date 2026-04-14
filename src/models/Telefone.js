export class Telefone {
    #id;
    #idCliente;
    #telefone;

    constructor(pidCliente, pTelefone, pId){
        this.idCliente = pidCliente;
        this.telefone = pTelefone;
        this.id = pId;
    }

    // Métodos acessores - GETTERS e SETTERS
    get id(){
        return this.#id;
    }
    set id(value){
        this.#validarId(value);
        this.#id = value;
    }

    get idCliente(){
        return this.#idCliente;
    }
    set idCliente(value){
        this.#validarId(value);
        this.#idCliente = value;
    }

    get telefone(){
        return this.#telefone;
    }
    set telefone(value){
        this.#validarTelefone(value);
        this.#telefone = value;
    }

    // Métodos auxiliares
    #validarId(value){
        if (value && value <= 0) {
            throw new Error('Verifique o ID informado');
        }
    }
    #validarTelefone(value){
        if (!value || value.trim().length < 8 || value.trim().length > 11) {
            throw new Error('O campo telefone deve ter entre 8 e 11 caracteres');
        }
    }

    // Criação de objetos utilizando o Design Pattern FACTORY METHOD
    static criar(dados){
        return new Telefone(null, dados.telefone, null);
    }
    static alterar(dados, id){
        return new Telefone(dados.telefone, id);
    }
}