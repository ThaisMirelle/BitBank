const readlineSync = require("readline-sync");

function calcularPoupanca(depositoInicial, meses) {
    const taxaJurosMensal = 0.53 / 100; // Taxa de juros de 0,5% ao mês, média do ano de 2024 até o mês de julho
    let saldo = depositoInicial;

    for (let i = 0; i < meses; i++) {
        saldo += saldo * taxaJurosMensal;
    }

    return saldo;
}

function solicitarDeposito() {
    const depositoInicial = parseFloat(
        readlineSync.question("Digite o valor do depósito inicial: R$ "),
    );

    const saldoProximoMes = calcularPoupanca(depositoInicial, 1);
    const saldoUmAno = calcularPoupanca(depositoInicial, 12);

    console.log(
        `\nCom um depósito inicial de R$ ${depositoInicial.toFixed(2)}, você terá R$ ${saldoProximoMes.toFixed(2)} no mês seguinte.`,
    );
    console.log(
        `Com um depósito inicial de R$ ${depositoInicial.toFixed(2)}, você terá R$ ${saldoUmAno.toFixed(2)} após 1 ano caso você não adicione mais nenhum valor a sua conta.`,
    );
}


module.exports = { solicitarDeposito };
