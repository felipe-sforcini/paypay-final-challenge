const { findAllClients, findAllClientsBySearch } = require('../../models/clients');
const { displayError } = require('../../supplements');

const showAllClients = async (req, res) => {
    const { search } = req.query;

    try {
        let clients;

        if (search) {
            clients = await findAllClientsBySearch(search)

        } else {
            clients = await findAllClients()
        }

        return res.status(200).send(clients)
    } catch (error) {
        displayError(error, res);
    }
}

module.exports = {
    showAllClients
}