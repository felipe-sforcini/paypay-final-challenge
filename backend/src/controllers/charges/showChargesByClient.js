const { findChargesByClientId, updateChargesStatusOverdue } = require('../../models/charges');
const { findClientById } = require('../../models/clients')
const { displayError, runResponse } = require("../../supplements");


const showChargesByClient = async (req, res) => {
    const { idCliente: idClient } = req.params;

    try {
        const clientFound = await findClientById(idClient);

        if (!clientFound) {
            return runResponse(404, 'Cliente não encontrado', res);
        }
        const chargesClient = await findChargesByClientId(idClient);

        return res.status(200).json({
            cliente: clientFound,
            cobrancas: chargesClient
        });
    } catch (error) {
        displayError(error, res);
    }
}

module.exports = showChargesByClient;