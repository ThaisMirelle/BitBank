const readlineSync = require("readline-sync");
const fs = require("fs");
const { calcularPorquinho } = require("./porquinho");
const { solicitarEmprestimo } = require("./emprestimo");
const {
    solicitarDeposito,
    visualizarSaldo,
    exibirExtrato,
    realizarTransferencia,
} = require("./operacoes");
const { iniciarChatSAC } = require("./sac");

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

function validarCPF(cpf) {
    return /^\d{11}$/.test(cpf);
}

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
    const nome = readlineSync.question("Digite seu nome: ");
    let cpf;
    while (true) {
        cpf = readlineSync.question("Digite seu CPF sem pontos ou traços: ");
        if (!validarCPF(cpf)) {
            console.log("CPF inválido. Deve conter exatamente 11 dígitos.");
        } else {
            break;
        }
    }

    let senha;
    while (true) {
        senha = readlineSync.question(
            "Digite uma senha com 6 dígitos (não sequenciais): ",
            { hideEchoBack: true },
        );
        if (!validarSenha(senha)) {
            console.log(
                "Senha inválida. Deve ter 6 dígitos e não pode ser sequencial.",
            );
        } else {
            break;
        }
    }

    const usuarios = carregarDados(caminhoArquivoUsuarios);
    if (usuarios.find((user) => user.cpf === cpf)) {
        console.log("Usuário já cadastrado.");
        return;
    }

    const usuario = { nome, cpf, senha, saldo: 0 }; // Adicionando saldo inicial
    usuarios.push(usuario);
    salvarDados(usuarios, caminhoArquivoUsuarios);
    console.log("Usuário cadastrado com sucesso!\n");
}

function login() {
    console.log("Login");
    const cpf = readlineSync.question("Digite seu CPF sem pontos ou traços: ");
    const senha = readlineSync.question("Digite sua senha: ", {
        hideEchoBack: true,
    });

    const usuarios = carregarDados(caminhoArquivoUsuarios);
    const usuario = usuarios.find(
        (user) => user.cpf === cpf && user.senha === senha,
    );

    if (!usuario) {
        console.log("Usuário não encontrado ou senha incorreta.\n");
        return false;
    }

    console.log("Login realizado com sucesso!\n");
    return usuario; // Retorna o usuário para acesso ao saldo e outras funcionalidades
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
        4- Voltar \n
        Digite o número do que desejar: `),
        );

        switch (opcao) {
            case 1:
                exibirOperacoesBasicas(usuario); // Passando o usuário para as operações básicas
                break;
            case 2:
                exibirProdutosEServicos(usuario); // Passando o usuário para os produtos e serviços
                break;
            case 3:
                exibirAutoAtendimento(usuario); // Passando o usuário para o autoatendimento
                break;
            case 4:
                return;
            default:
                console.log("Opção inválida. Tente novamente.");
                break;
        }
    }
}

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
                    "Digite o número do que desejar: ",
            ),
        );

        switch (opcao) {
            case 1:
                solicitarDeposito(); // Chama a função de depósito
                finalizarFuncao();
                break;
            case 2:
                visualizarSaldo(); // Exibe o saldo do usuário
                finalizarFuncao();
                break;
            case 3:
                exibirExtrato(); // Exibe o extrato do usuário
                finalizarFuncao();
                break;
            case 4:
                realizarTransferencia(); // Chama a função de transferência bancária
                finalizarFuncao();
                break;
            case 5:
                return;
            default:
                console.log("Opção inválida.\n");
                break;
        }
    }
}

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
        readlineSync.question("Digite o número do que desejar: "),
    );

    switch (produtosServicos) {
        case 1:
            solicitarEmprestimo();
            finalizarFuncao();
            break;
        case 2:
            solicitarDeposito();
            finalizarFuncao();
            break;
        case 3:
            calcularPorquinho();
            finalizarFuncao();
            break;
        case 4:
            categoria(usuario); // Passa o usuário para voltar ao menu
            break;
        default:
            console.log("Opção inválida.");
            exibirProdutosEServicos(usuario); // Passa o usuário para o menu de produtos e serviços
            break;
    }
}

function exibirAutoAtendimento(usuario) {
    bigSpacing();
    console.log("Autoatendimento: \n" + "1- SAC \n" + "2- Voltar");

    const autoAtendimento = Number(
        readlineSync.question("Digite o número do que desejar: "),
    );

    switch (autoAtendimento) {
        case 1:
            iniciarChatSAC(); // Chama a função do SAC
            break;
        case 2:
            categoria(usuario); // Passa o usuário para voltar ao menu
            break;
        default:
            console.log("Opção inválida.");
            exibirAutoAtendimento(usuario); // Passa o usuário para o autoatendimento
            break;
    }
}

function finalizarFuncao() {
    const opcao = readlineSync.question(
        "Pressione Enter para voltar ao menu anterior ou digite 'sair' para sair: ",
    );
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
        readlineSync.question(`Bem-vindo ao Banco Softex . \n
        Para continuar, é preciso estar logado.\n
        Realize seu login, ou crie um novo cadastro selecionando uma das opções abaixo:\n
        1. Login\n
        2. Cadastro \n
        3. Sair \n
        Digite sua opção: `),
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
            console.log("Opção inválida. Tente novamente.");
            inicial();
            break;
    }
}

inicial();
