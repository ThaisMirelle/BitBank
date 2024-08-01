//const fs = require("fs");
import fs from 'fs';
//const readlineSync = require("readline-sync");
import readlineSync from "readline-sync";
import chalk from 'chalk'

//consts sem require: não modifica. não funciona com import.
const caminhoArquivoUsuarios = "./usuarios.txt";
const caminhoArquivoMovimentacoes = "./movimentacoes.txt";

// Função para registrar uma movimentação
function registrarMovimentacao(cpf, tipo, valor) {
    const data = new Date().toISOString();
    const movimentacao = { data, cpf, tipo, valor };

    let movimentacoes = carregarDados(caminhoArquivoMovimentacoes);
    movimentacoes.push(movimentacao);
    salvarDados(movimentacoes, caminhoArquivoMovimentacoes);
}

// Função para solicitar um depósito
export function solicitarDeposito(cpfUsuario) {
    const cpf = cpfUsuario
    const valor = parseFloat(
        readlineSync.question("Digite o valor do depósito: R$ "),
    );

    if (isNaN(valor) || valor <= 0) {
        console.log(chalk.white(chalk.bgRed("Valor inválido. O depósito deve ser um número positivo.")));
        return;
    }

    const usuarios = carregarDados(caminhoArquivoUsuarios);
    const usuario = usuarios.find((user) => user.cpf === cpf);

    if (!usuario) {
        console.log(chalk.white(chalk.bgRed("Usuário não encontrado.")));
        return;
    }

    usuario.saldo += valor;
    registrarMovimentacao(cpf, "Depósito", valor);
    salvarDados(usuarios, caminhoArquivoUsuarios);
    console.log(chalk.greenBright(`Depósito de R$ ${valor.toFixed(2)} realizado com sucesso!`));
}

// Função para visualizar o saldo
export function visualizarSaldo(cpfUsuario) {
    const cpf = cpfUsuario
    const usuarios = carregarDados(caminhoArquivoUsuarios);
    const usuario = usuarios.find((user) => user.cpf === cpf);

    if (!usuario) {
        console.log(chalk.white(chalk.bgRed("Usuário não encontrado.")));
        return;
    }

    console.log(`Seu saldo atual é: R$ ${usuario.saldo.toFixed(2)}`);
}

// Função para exibir o extrato com um layout organizado
export function exibirExtrato(cpfUsuario) {
    const cpf = cpfUsuario
    const movimentacoes = carregarDados(caminhoArquivoMovimentacoes);
    const movimentacoesUsuario = movimentacoes.filter((mov) => mov.cpf === cpf);

    if (movimentacoesUsuario.length === 0) {
        console.log(chalk.white(chalk.bgred("Nenhuma movimentação encontrada para o CPF informado.")));
        return;
    }

    console.log("Extrato de Movimentações:");
    console.log("-------------------------------------------------");
    console.log("| Data                | Tipo       | Valor       |");
    console.log("-------------------------------------------------");

    movimentacoesUsuario.forEach((mov) => {
        const dataFormatada = new Date(mov.data).toLocaleString();
        const tipoFormatado = mov.tipo.padEnd(10, " ");
        const valorFormatado = mov.valor.toFixed(2).padStart(10, " ");

        console.log(
            `| ${dataFormatada.padEnd(19, " ")} | ${tipoFormatado} | R$ ${valorFormatado} |`,
        );
    });

    console.log("-------------------------------------------------");
}

// Função para realizar uma transferência bancária
export function realizarTransferencia(cpfUsuario) {
    const cpfRemetente = cpfUsuario;
    const cpfDestinatario = readlineSync.question(
        "Digite o CPF do destinatário: ",
    );
    const valor = parseFloat(
        readlineSync.question("Digite o valor da transferência: R$ \n"),
    );

    if (isNaN(valor) || valor <= 0) {
        console.log(chalk.white(chalk.bgRed(
            "Valor inválido. A transferência deve ser um número positivo.",
        )));
        return;
    }

    const usuarios = carregarDados(caminhoArquivoUsuarios);
    const remetente = usuarios.find((user) => user.cpf === cpfRemetente);
    const destinatario = usuarios.find((user) => user.cpf === cpfDestinatario);

    if (!remetente) {
        console.log(chalk.white(chalk.bgRed("Remetente não encontrado.")));
        return;
    }

    if (!destinatario) {
        console.log(chalk.white(chalk.bgRed("Destinatário não encontrado.")));
        return;
    }

    if (remetente.saldo < valor) {
        console.log(chalk.white(chalk.bgRed("Saldo insuficiente para a transferência.")));
        return;
    }

    // Atualiza os saldos
    remetente.saldo -= valor;
    destinatario.saldo += valor;

    // Registra as movimentações
    registrarMovimentacao(cpfRemetente, "Transferência Enviada", valor);
    registrarMovimentacao(cpfDestinatario, "Transferência Recebida", valor);

    salvarDados(usuarios, caminhoArquivoUsuarios);
    console.log(
        `Transferência de R$ ${valor.toFixed(2)} realizada com sucesso!`,
    );
}

// Funções auxiliares para manipular arquivos
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

