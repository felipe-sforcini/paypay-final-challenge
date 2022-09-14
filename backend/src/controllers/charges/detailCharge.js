const { findChargeById } = require("../../models/charges");
const { displayError, runResponse } = require("../../supplements");

const detailCharge = async (req, res) => {
    const { id } = req.params;

    try {
        const chargeFound = await findChargeById(id);

        if (!chargeFound) {
            runResponse(404, 'Cobrança não encontrada', res);
        }

        return res.status(200).json(chargeFound);
    } catch (error) {
        displayError(error, res);
    }
}

module.exports = detailCharge;
