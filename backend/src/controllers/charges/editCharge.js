const { findChargeById, saveChargeUpdate, findChargesByClientId } = require('../../models/charges');
const { findClientByClientId, updateClientStatus } = require('../../models/clients')
const { displayError, runResponse } = require("../../supplements");
const { chargeValidation } = require('../../validations/yupSchemaCharge');

const editCharge = async (req, res) => {
    const { id } = req.params;

    try {
        await chargeValidation.validate(req.body);

        const chargeFound = await findChargeById(id);

        if (!chargeFound) {
            return runResponse(404, 'Cobrança não encontrada', res);
        }

        const updateCharge = await saveChargeUpdate(id, req);

        if (!updateCharge) {
            return runResponse(400, 'Não foi possível atualizar a cobrança', res);
        }

        const clientFound = await findClientByClientId(chargeFound.cliente_id)
        const chargesClient = await findChargesByClientId(chargeFound.cliente_id);

        const someOverdueCharge = await chargesClient.some(item => item.status === 'vencida');

        clientFound.status = someOverdueCharge ? false : true;

        await updateClientStatus(clientFound)

        return runResponse(200, 'Cobrança atualizada com sucesso.', res);
    } catch (error) {
        displayError(error, res);
    }
};

module.exports = editCharge