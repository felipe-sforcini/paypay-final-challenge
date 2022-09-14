const { findClientById, saveClientUpdated, findClientByEmail, findClientByCpf, findClientByPhone } = require("../../models/clients");
const { displayError, runResponse } = require("../../supplements");
const { clientValidation } = require("../../validations/yupSchemaClient");

const editClient = async (req, res) => {
    const { id } = req.params;
    const { email, cpf, telefone } = req.body;

    try {
        await clientValidation.validate(req.body);

        const clientFound = await findClientById(id);

        if (!clientFound) {
            return runResponse(404, 'Cliente não encontrado', res);
        }

        if (email !== clientFound.email) {
            const emailInUse = await findClientByEmail(email);
            if (emailInUse) {
                return runResponse(400, 'Já existe um cliente cadastrado com o email informado', res);
            }
        }

        if (cpf !== clientFound.cpf) {
            const cpfInUse = await findClientByCpf(cpf);
            if (cpfInUse) {
                return runResponse(400, 'Já existe um cliente cadastrado com o cpf informado', res);
            }
        }

        if (telefone !== clientFound.telefone) {
            const phoneInUse = await findClientByPhone(telefone);
            if (phoneInUse) {
                return runResponse(400, 'Já existe um cliente cadastrado com o telefone informado', res);
            }
        }

        const updatedClient = await saveClientUpdated(id, req);

        if (!updatedClient) {
            return runResponse(400, 'Cliente não foi atualizado', res);
        }

        return runResponse(200, 'Cliente atualizado com sucesso.', res);
    } catch (error) {
        displayError(error, res);
    }
}

module.exports = {
    editClient
}