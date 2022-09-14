const {
    findAllPaidCharges,
    findAllOverdueCharges,
    findAllPendingCharges,
    showPaidChargesBySearch,
    showOverdueChargesBySearch,
    showPendingChargesBySearch
} = require("../../models/chargesSummary");
const { displayError } = require("../../supplements");

const chargesSummary = async (req, res) => {
    const { search } = req.query;

    try {
        let showAllPaidCharges;
        let showAllOverdueCharges;
        let showAllPendingCharges;

        if (search) {
            [showAllPaidCharges, showAllOverdueCharges, showAllPendingCharges ] = await Promise.all([showPaidChargesBySearch(search), showOverdueChargesBySearch(search), showPendingChargesBySearch(search)]);

        } else {
            [showAllPaidCharges, showAllOverdueCharges, showAllPendingCharges] = await Promise.all([findAllPaidCharges(), findAllOverdueCharges(), findAllPendingCharges()]);
        }

        return res.status(200).json({
            cobrancasPagas: showAllPaidCharges.length,
            listaCobrancasPagas: showAllPaidCharges,
            cobrancasVencidas: showAllOverdueCharges.length,
            listaCobrancasVencidas: showAllOverdueCharges,
            cobrancasPendentes: showAllPendingCharges.length,
            listaCobrancasPendentes: showAllPendingCharges
        });
    } catch (error) {
        displayError(error, res);
    }
}

module.exports = chargesSummary;