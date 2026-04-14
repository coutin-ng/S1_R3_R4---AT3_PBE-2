export class Produto {
    #id;
    #idCategoria;
    #nome;
    #valor;
    #caminhoImagem;
    #dataCad;

    constructor(pIdCategoria, pNome, pValor, pCaminhoImagem, pId){
        this.idCategoria = pIdCategoria
        this.nome = pNome;
        this.valor = pValor;
        this.caminhoImagem= pCaminhoImagem;
        this.id = pId;
    }

    // Métodos acessores - GETTERS e SETTERS

    get idCategoria(){
        return this.#idCategoria;
    }
    set idCategoria(value){
        this.#validarIdCategoria(value);
        this.#idCategoria = value;
    }

    get nome(){
        return this.#nome;
    }
    set nome(value){
        this.#validarNome(value);
        this.#nome = value;
    }

    get valor(){
        return this.#valor;
    }
    set valor(value){
        this.#validarValor(value);
        this.#valor = value;
    }

    get caminhoImagem(){
        return this.#caminhoImagem;
    }
    set caminhoImagem(value){
        this.#validarCaminhoImagem(value);
        this.#caminhoImagem = value;
    }

    // Métodos auxiliares
    #validarId(value){
        if (value && value <= 0) {
            throw new Error('Verifique o ID informado');
        }
    }
    #validarIdCategoria(value){
        if (value && value <= 0) {
            throw new Error('Verifique o ID informado');
        }
    }
    #validarNome(value){
        if (!value || value.trim().length < 3 || value.trim().length > 45) {
            throw new Error('O campo nome é obrigatório e deve ter entre 3 e 45 caracteres');
        }
    }
    #validarValor(value){
        if (!value || isNaN(value) || value <=0) {
            throw new Error('O campo valor é obrigatório e deve ser um número válido');
        }
    }
    #validarCaminhoImagem(value){
        if (value && (value.trim().length < 10 || value.trim().length > 250)) {
            throw new Error('O campo de imagem é obrigatório e deve ter entre 10 e 250 caracteres');
        }
    }

    // Criação de objetos utilizando o Design Pattern FACTORY METHOD
    static criar(dados){
        return new Produto(dados.idCategoria, dados.nome, dados.valor, dados.caminhoImagem, null);
    }
    static alterar(dados, id){
        return new Produto(dados.idCategoria, dados.nome, dados.valor, dados.caminhoImagem, id);
    }
}