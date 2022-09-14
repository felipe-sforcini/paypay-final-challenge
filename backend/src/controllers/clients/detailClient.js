const { findClientById } = require("../../models/clients");
const { displayError, runResponse } = require("../../supplements");

const detailClient = async (req, res) => {
    const { id } = req.params;

    try {
        const clientFound = await findClientById(id);

        if (!clientFound) {
            runResponse(404, 'Cliente não encontrado', res);
        }

        return res.status(200).json(clientFound);
    } catch (error) {
        displayError(error, res);
    }
}

module.exports = {
    detailClient
}