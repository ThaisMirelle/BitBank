const readlineSync = require("readline-sync");

// Função para o chat do SAC
function iniciarChatSAC() {
    const respostas = {
        "horário de funcionamento": "Nosso horário de funcionamento é de segunda a sexta-feira, das 9h às 18h.",
        "como faço um depósito?": "Você pode fazer um depósito acessando a opção 'Depósito' no menu de operações financeiras.",
        "como posso alterar minha senha?": "Para alterar sua senha, você precisa acessar a opção 'Alterar Senha' no menu de perfil.",
        "quais são os produtos oferecidos?": "Oferecemos empréstimos, poupança, e o porquinho, além de outros serviços bancários.",
        "como faço uma transferência?": "Para fazer uma transferência, acesse a opção 'Transferência Bancária' no menu de operações financeiras.",
        "obrigado": "De nada! Se precisar de mais alguma coisa, estarei por aqui.",
        "sair": "Encerrando o chat. Tenha um ótimo dia!"
    };

    console.log("Bem-vindo ao SAC do Banco Softex. Como posso ajudar você hoje?");
    console.log("Digite 'sair' para encerrar o chat.");

    while (true) {
        const pergunta = readlineSync.question("Você: ").toLowerCase();

        if (pergunta === "sair") {
            console.log("Bot: " + respostas["sair"]);
            break;
        }

        const resposta = respostas[pergunta] || "Desculpe, não entendi sua pergunta. Pode reformular?";
        console.log("Bot: " + resposta);
    }
}

module.exports = {
    iniciarChatSAC
};