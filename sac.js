//const readlineSync = require("readline-sync");
import readlineSync from "readline-sync";

// Função para o chat do SAC
export function iniciarChatSAC() {
    const opcoes = [
        "Horário de funcionamento",
        "Como faço um depósito?",
        "Quais são os produtos oferecidos?",
        "Como faço uma transferência?",
        "Como vejo meu saldo?",
 
    ];

    const respostas = {
        0: "Nosso horário de funcionamento é de segunda a sexta-feira, das 9h às 18h.",
        1: "Você pode fazer um depósito acessando a opção 'Depósito' no nosso app ou em um de nossos caixas eletrônicos.",
        2: "Oferecemos contas correntes, poupança, empréstimos pessoais e investimentos.",
        3: "Para fazer uma transferência, acesse a opção 'Transferência' no nosso app, site ou em um de nossos caixas eletrônicos.",
        4: "Você pode consultar seu saldo acessando a opção 'Consultar Saldo' no nosso app, site ou em um de nossos caixas eletrônicos.",
    };

    console.log("Bem-vindo ao SAC do Banco Softex. Como posso ajudar você hoje?");

    while (true) {
        const indice = readlineSync.keyInSelect(opcoes, "Escolha uma opção:");

        if (indice === -1 || indice === 9) {
            console.log("Bot: " + respostas[9]);
            break;
        }

        console.log("Bot: " + respostas[indice]);
    }
}