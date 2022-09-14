const { findChargeById, runDeleteCharge } = require('../../models/charges')
const { displayError, runResponse } = require("../../supplements");

const deleteCharge = async (req, res) => {
    const { id } = req.params;

    try {
        const chargeFound = await findChargeById(id);

        if (!chargeFound) {
            return runResponse(404, 'Cobrança não encontrada', res);
        }

        if (chargeFound.status === 'vencida' || chargeFound.status === 'paga') {
            return runResponse(400, 'Esta cobrança não pode ser excluída', res)
        }

        const chargeExcluded = await runDeleteCharge(chargeFound);

        if (!chargeExcluded) {
            return runResponse(400, 'Não foi possível excluir a cobrança', res);
        }

        return runResponse(200, 'Cobrança excluida com sucesso.', res);
    } catch (error) {
        displayError(error, res);
    }
};

module.exports = deleteCharge;