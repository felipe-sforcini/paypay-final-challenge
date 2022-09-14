const { summaryPaidCharges, summaryOverdueCharges, summaryPendingCharges } = require('../../models/cashSummary')
const { displayError } = require("../../supplements");

const cashSummary = async (req, res) => {

    try {
        const chargesPaid = await summaryPaidCharges();

        const chargesOverdue = await summaryOverdueCharges();

        const chargesPending = await summaryPendingCharges();

        return res.status(200).send({
            totalCobrancasPagas: Number(chargesPaid.cobrancasPagas),
            totalCobrancasVencidas: Number(chargesOverdue.cobrancasVencidas),
            totalCobrancasPendentes: Number(chargesPending.cobrancasPendentes)
        })
    } catch (error) {
        displayError(error, res);
    }
}

module.exports = cashSummary;