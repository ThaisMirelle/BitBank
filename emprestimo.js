//const readlineSync = require("readline-sync");
import readlineSync from "readline-sync"

function calcularValorEmprestimo(depositos) {
    // Calculo de média dos depósitos dos últimos 6 meses
    const somaDepositos = depositos.reduce((acc, curr) => acc + curr, 0);
    const mediaDepositos = somaDepositos / depositos.length;

    // Valor do empréstimo (200% da média dos depósitos)
    const valorEmprestimo = mediaDepositos * 2;
    return valorEmprestimo;
}

function calcularParcelas(valorEmprestimo, valorParcelaMensal) {
    const taxaJurosMensal = 7 / 100; // Taxa de juros fixa de 7% ao mês, baseado na media de juros dos bancos em 2023
    let meses = 0;
    let saldoDevedor = valorEmprestimo;

    while (saldoDevedor > 0) {
        saldoDevedor += saldoDevedor * taxaJurosMensal - valorParcelaMensal;
        meses++;
    }

    return meses;
}

function calcularTotalPago(meses, valorParcelaMensal) {
    return meses * valorParcelaMensal;
}

function solicitarDepositos() {
    console.log("Digite os seus 6 últimos salários abaixo:");
    let depositos = [];
    for (let i = 1; i <= 6; i++) {
        const deposito = parseFloat(
            readlineSync.question(`Salário do mês ${i}: R$ `),
        );
        depositos.push(deposito);
    }
    return depositos;
}

export function solicitarEmprestimo() {
    const depositos = solicitarDepositos();
    const valorEmprestimo = calcularValorEmprestimo(depositos);

    console.log(
        `\nCom base nos seus depósitos, você pode pegar um empréstimo de até R$ ${valorEmprestimo.toFixed(2)}`,
    );

    const valorParcelaMensal = parseFloat(
        readlineSync.question("Quanto você pode pagar por mês? R$ "),
    );

    const meses = calcularParcelas(valorEmprestimo, valorParcelaMensal);
    const valorTotalPago = calcularTotalPago(meses, valorParcelaMensal);

    console.log(
        `\nCom um pagamento mensal de R$ ${valorParcelaMensal.toFixed(2)}, você levará aproximadamente ${meses} meses para pagar o empréstimo com juros inclusos.`,
    );

    console.log(
        `O valor total pago ao final do empréstimo será de R$ ${valorTotalPago.toFixed(2)}.`,
    );
}
