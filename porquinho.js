const readlineSync = require("readline-sync");
const CDI = 13.04; // Taxa do CDI em percentual

function calcularPorquinho() {
    const inicial = readlineSync.question("Digite o investimento inicial: R$ ");
    const mensal = readlineSync.question("Digite o investimento mensal: R$ ");
    const numMeses = readlineSync.question("Digite o número de meses: ");

    const taxaDeJuros = CDI / 12; // Rendimento mensal baseado no CDI
    calcularJurosCompostos(
        parseFloat(inicial),
        parseFloat(mensal),
        parseInt(numMeses),
        taxaDeJuros,
    );
}

function calcularJurosCompostos(
    investimentoInicial,
    investimentoMensal,
    meses,
    taxaDeJuros,
) {
    let investimentoAcumulado = investimentoInicial;
    const totalInvestimentoAcumulado =
        investimentoInicial + investimentoMensal * meses;
    let jurosCompostosTotal = 0;

    for (let i = 0; i < meses; i++) {
        const jurosCompostos = (investimentoAcumulado * taxaDeJuros) / 100;
        jurosCompostosTotal += jurosCompostos;
        investimentoAcumulado += jurosCompostos + investimentoMensal;
    }

    const valorAReceber = totalInvestimentoAcumulado + jurosCompostosTotal;
    console.log(
        `Valor total a receber após ${meses} meses: R$ ${valorAReceber.toFixed(2)}`,
    );
}

// Exportando a função
module.exports = {
    calcularPorquinho,
};
