const knex = require('../connection');

async function summaryPaidCharges() {
    return knex('cobrancas').sum('valor as cobrancasPagas').where({ status: 'paga' }).first();
}

async function summaryOverdueCharges() {
    return knex('cobrancas').sum('valor as cobrancasVencidas').where({ status: 'vencida' }).first();
}

async function summaryPendingCharges() {
    return knex('cobrancas').sum('valor as cobrancasPendentes').where({ status: 'pendente' }).first();
}

module.exports = {
    summaryPaidCharges,
    summaryOverdueCharges,
    summaryPendingCharges
}