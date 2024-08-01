//const readlineSync = require("readline-sync");
import readlineSync from "readline-sync";
//chalk
import chalk from "chalk";
//const fs = require("fs");
import fs from 'fs';
//const { calcularPorquinho } = require("./porquinho");
import { calcularPorquinho } from "./porquinho.js";
//const { solicitarEmprestimo } = require("./emprestimo");
import {solicitarEmprestimo} from "./emprestimo.js";
//const { simularDeposito } = require('./poupanca');
import { simularDeposito } from "./poupanca.js";
// const {
//     solicitarDeposito,
//     visualizarSaldo,
//     exibirExtrato,
//     realizarTransferencia,
// } = require("./operacoes");
import {
    solicitarDeposito,
    visualizarSaldo,
    exibirExtrato,
    realizarTransferencia,
} from "./operacoes.js"

//const { iniciarChatSAC } = require("./sac");
import { iniciarChatSAC } from "./sac.js";

let cpfUsuario = ''

const caminhoArquivoUsuarios = "./usuarios.txt";

function salvarDados(dados, caminhoArquivo) {
    fs.writeFileSync(caminhoArquivo, JSON.stringify(dados, null, 2), "utf8");
}

function carregarDados(caminhoArquivo) {
    if (fs.existsSync(caminhoArquivo)) {
        const dados = fs.readFileSync(caminhoArquivo, "utf8");
        return JSON.parse(dados);
    }
    return [];
}

// Função de validação de CPF
function validarCPF(cpf) {
    return /^\d{11}$/.test(cpf);
}

// Função de validação de senha
function validarSenha(senha) {
    if (senha.length !== 6) return false;
    const primeiraLetra = senha[0];
    for (let i = 1; i < senha.length; i++) {
        if (senha[i] !== primeiraLetra) return true;
    }
    return false;
}

// Funções de cadastro e login
function tCadastro() {
    console.log("Cadastrar Novo Usuário");
    const nome = readlineSync.question(chalk.yellowBright("Digite seu nome: "));
    let cpf;
    while (true) {
        cpf = readlineSync.question(chalk.yellowBright("Digite seu CPF sem pontos ou traços: "));
        if (!validarCPF(cpf)) {
            console.log(chalk.bgRed("CPF inválido. Deve conter exatamente 11 dígitos."));
        } else {
            break;
        }
    }

    let senha;
    while (true) {
        senha = readlineSync.question(chalk.yellowBright(
            "Digite uma senha com 6 dígitos (não sequenciais): "
        ));
        if (!validarSenha(senha)) {
            console.log(chalk.white(chalk.bgRed(
                "Senha inválida. Deve ter 6 dígitos e não pode ser sequencial.",
            )));
        } else {
            break;
        }
    }

    const usuarios = carregarDados(caminhoArquivoUsuarios);
    if (usuarios.find((user) => user.cpf === cpf)) {
        console.log("Usuário já cadastrado.");
        return;
    }

    const usuario = { nome, cpf, senha, saldo: 0 }; 
    usuarios.push(usuario);
    salvarDados(usuarios, caminhoArquivoUsuarios);
    console.log(chalk.greenBright("Usuário cadastrado com sucesso!\n"));
}

function login() {
    console.log("Login");
    const cpf = readlineSync.question(chalk.yellowBright("Digite seu CPF sem pontos ou traços: "));
    const senha = readlineSync.question(chalk.yellowBright("Digite sua senha: "));

    const usuarios = carregarDados(caminhoArquivoUsuarios);
    const usuario = usuarios.find(
        (user) => user.cpf === cpf && user.senha === senha,
    );
    cpfUsuario = usuario.cpf

    if (!usuario) {
        console.log(chalk.White(chalk.bgRed("Usuário não encontrado ou senha incorreta.\n")));
        return false;
    }

    console.log(chalk.greenBright("Login realizado com sucesso!\n"));
    return usuario; 
}

// Funções para navegação no menu
function categoria(usuario) {
    bigSpacing();
    while (true) {
        const opcao = Number(
            readlineSync.question(`Banco Softex \n
        1- Operações Financeiras Básicas \n
        2- Produtos e Serviços \n
        3- Autoatendimento \n
        4- Voltar \n` +
        chalk.yellowBright(`
        Digite o número do que desejar: `)),
        );

        switch (opcao) {
            case 1:
                exibirOperacoesBasicas(usuario); 
                break;
            case 2:
                exibirProdutosEServicos(usuario); 
                break;
            case 3:
                exibirAutoAtendimento(usuario); 
                break;
            case 4:
                inicial();
            default:
                console.clear()
                console.log(chalk.white(chalk.bgRed("Opção inválida. Tente novamente.")));
                break;
        }
    }
}

// Menu de operações básicas
function exibirOperacoesBasicas(usuario) {
    bigSpacing();
    while (true) {
        const opcao = Number(
            readlineSync.question(
                "Operações Financeiras Básicas: \n" +
                    "1- Depósito \n" +
                    "2- Visualização de Saldo \n" +
                    "3- Extrato \n" +
                    "4- Transferência Bancária \n" +
                    "5- Voltar \n" + 
                    chalk.yellowBright(
                    "Digite o número do que desejar: "),
            ),
        );

        switch (opcao) {
            case 1:
                solicitarDeposito(cpfUsuario); // Chama a função de depósito
                finalizarFuncao();
                break;
            case 2:
                visualizarSaldo(cpfUsuario); // Exibe o saldo do usuário
                finalizarFuncao();
                break;
            case 3:
                exibirExtrato(cpfUsuario); // Exibe o extrato do usuário
                finalizarFuncao();
                break;
            case 4:
                realizarTransferencia(cpfUsuario); // Chama a função de transferência bancária
                finalizarFuncao();
                break;
            case 5:
                return;
            default:
                console.clear();
                console.log(chalk.White(chalk.bgRed("Opção inválida.\n")));
                break;
        }
    }
}

// Menu de produtos e serviços
function exibirProdutosEServicos(usuario) {
    bigSpacing();
    console.log(
        "Produtos e Serviços: \n" +
            "1- Empréstimo \n" +
            "2- Poupança \n" +
            "3- Porquinho \n" +
            "4- Voltar",
    );

    const produtosServicos = Number(
        readlineSync.question(chalk.yellowBright("Digite o número do que desejar: ")),
    );

    switch (produtosServicos) {
        case 1:
            solicitarEmprestimo(); // Chama a função de empréstimo
            finalizarFuncao();
            break;
        case 2:
            simularDeposito(); // Chama a função de poupança
            finalizarFuncao();
            break;
        case 3:
            calcularPorquinho(); // Chama a função de porquinho
            finalizarFuncao();
            break;
        case 4:
            categoria(usuario); // Passa o usuário para voltar ao menu
            break;
        default:
            console.log(chalk.white(chalk.bgRed("Opção inválida.")));
            exibirProdutosEServicos(usuario); 
            break;
    }
}

// Menu de auto-atendimento
function exibirAutoAtendimento(usuario) {
    bigSpacing();
    console.log("Autoatendimento: \n" + "1- SAC \n" + "2- Voltar");

    const autoAtendimento = Number(
        readlineSync.question(chalk.yellowBright("Digite o número do que desejar: ")),
    );

    switch (autoAtendimento) {
        case 1:
            iniciarChatSAC(); // Chama a função do SAC
            break;
        case 2:
            categoria(usuario); 
            break;
        default:
            console.log(chalk.white(chalk.bgRed("Opção inválida.")));
            exibirAutoAtendimento(usuario); 
            break;
    }
}

function finalizarFuncao() {
    const opcao = readlineSync.question(chalk.yellowBright(
        "Pressione Enter para voltar ao menu anterior ou digite 'sair' para sair:\n ",
    ));
    if (opcao.toLowerCase() === "sair") {
        process.exit();
    }
    bigSpacing();
}

function bigSpacing() {
    console.log("\n".repeat(8));
}

// Menu principal
function inicial() {
    bigSpacing();
    let escolha = Number(
        readlineSync.question(`Bem-vindo ao BitBank . \n`+
        chalk.yellow(`
        Para continuar, é preciso estar logado.\n`)+
        `Realize seu login, ou crie um novo cadastro selecionando uma das opções abaixo:\n
        1. Login\n
        2. Cadastro \n
        3. Sair \n `+
        chalk.yellowBright(`
        Digite sua opção: `)),
    );

    switch (escolha) {
        case 1:
            const usuario = login();
            if (usuario) {
                categoria(usuario);
            } else {
                inicial();
            }
            break;
        case 2:
            tCadastro();
            inicial();
            break;
        case 3:
            console.log("Saindo...");
            break;
        default:
            console.clear();
            console.log(chalk.White(chalk.bgRed("Opção inválida. Tente novamente.")));
            inicial();
            break;
    }
}

inicial();
