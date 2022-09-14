const { findAllCharges, findAllChargesBySearch } = require('../../models/charges');
const { displayError } = require('../../supplements');

const showAllCharges = async (req, res) => {
    const { search } = req.query;

    try {
        let charges;

        if (search) {
            charges = await findAllChargesBySearch(search)

        } else {
            charges = await findAllCharges()
        }

        return res.status(200).send(charges)
    } catch (error) {
        displayError(error, res);
    }
}

module.exports = showAllCharges;
