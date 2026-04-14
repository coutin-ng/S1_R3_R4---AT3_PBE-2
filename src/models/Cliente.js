export class Cliente {
    #id;
    #nome;
    #cpf;
    #dataCad;

    constructor(pNome, pCpf, pId){
        this.nome = pNome;
        this.cpf = pCpf;
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

    get nome(){
        return this.#nome;
    }
    set nome(value){
        this.#validarNome(value);
        this.#nome = value;
    }

    get cpf(){
        return this.#cpf;
    }
    set cpf(value){
        this.#validarCpf(value);
        this.#cpf = value;
    }

    // Métodos auxiliares
    #validarId(value){
        if (value && value <= 0) {
            throw new Error('Verifique o ID informado');
        }
    }
    #validarNome(value){
        if (!value || value.trim().length < 3 || value.trim().length > 45) {
            throw new Error('O campo nome é obrigatório e deve ter entre 3 e 45 caracteres');
        }
    }
    #validarCpf(cpf){
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
        return false;
    }


    let soma = 0;
    let resto;


    // Validação do 1º dígito
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;


    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) {
        return false;
    }


    soma = 0;


    // Validação do 2º dígito
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;


    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) {
        return false;
    }


    return true;
}
    

    // Criação de objetos utilizando o Design Pattern FACTORY METHOD
    static criar(dados){
        return new Cliente(dados.nome, dados.cpf, null);
    }
    static alterar(dados, id){
        return new Cliente(dados.nome, dados.cpf, id);
    }
}