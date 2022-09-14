const knex = require('../../connection')
const { displayError, runResponse } = require('../../supplements');
const { chargeValidation } = require("../../validations/yupSchemaCharge");
const { findClientById } = require('../../models/clients');
const { findChargesByClientId } = require('../../models/charges');

const registerCharge = async (req, res) => {
    const { idCliente: idClient } = req.params;

    const { nome, descricao, vencimento, valor, status } = req.body;

    try {
        await chargeValidation.validate(req.body);

        const clientFound = await findClientById(idClient)

        if (!clientFound) {
            return runResponse(400, 'Cliente não encontrado', res);
        }

        const registration = await knex('cobrancas')
            .insert({
                cliente_id: clientFound.id,
                nome,
                descricao,
                vencimento,
                valor,
                status
            });

        if (!registration) {
            return runResponse(400, 'Não foi possível cadastrar essa cobrança', res);
        }

        const chargesClient = await findChargesByClientId(idClient);

        const someOverdueCharge = await chargesClient.some(item => item.status === 'vencida');

        clientFound.status = someOverdueCharge ? false : true;

        await knex('clientes').update(clientFound).where({ id: idClient });

        return runResponse(201, 'Cobrança cadastrada com sucesso.', res);
    } catch (error) {
        displayError(error, res);
    }
};

module.exports = registerCharge;