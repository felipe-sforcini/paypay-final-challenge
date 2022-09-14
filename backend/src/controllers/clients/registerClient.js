const knex = require('../../connection');
const { findClientByEmail, findClientByCpf, findClientByPhone } = require('../../models/clients');
const { displayError, runResponse } = require('../../supplements');
const { clientValidation } = require('../../validations/yupSchemaClient');

const registerClient = async (req, res) => {
    const { id: userId } = req.user;

    const { nome, email, cpf, telefone, cep, logradouro, complemento, bairro, cidade, estado } = req.body;

    try {
        await clientValidation.validate(req.body);

        const emailExists = await findClientByEmail(email);

        if (emailExists) {
            return runResponse(400, 'Esse email já foi cadastrado', res);
        }

        const cpfExists = await findClientByCpf(cpf);

        if (cpfExists) {
            return runResponse(400, 'Esse cpf já foi cadastrado', res);
        }

        const phoneExists = await findClientByPhone(telefone);

        if (phoneExists) {
            return runResponse(400, 'Esse telefone já foi cadastrado', res);
        }

        const registrationClient = await knex('clientes')
            .insert({
                usuario_id: userId,
                nome,
                email,
                cpf,
                telefone,
                logradouro,
                complemento,
                cep,
                bairro,
                cidade,
                estado
            });

        if (!registrationClient) {
            return runResponse(400, 'Não foi possível cadastrar esse cliente', res);
        }

        return runResponse(201, 'Cliente cadastrado com sucesso.', res);

    } catch (error) {
        displayError(error, res);
    }
}

module.exports = {
    registerClient
}

