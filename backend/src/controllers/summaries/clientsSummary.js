const { findAllDefaulters, findAllNonDefaulters, showAllDefaultersBySearch, showAllNonDefaultersBySearch } = require("../../models/clientsSummary");
const { displayError } = require("../../supplements")


const clientsSummary = async (req, res) => {
    const { search } = req.query;
    try {

        let showAllDefaulters;
        let showAllNonDefaulters;

        if (search) {
            [showAllDefaulters, showAllNonDefaulters] = await Promise.all([showAllDefaultersBySearch(search), showAllNonDefaultersBySearch(search)])
        } else {
            [showAllDefaulters, showAllNonDefaulters] = await Promise.all([findAllDefaulters(), findAllNonDefaulters()]);
        }

        return res.status(200).json({
            clientesInadimplentes: showAllDefaulters.length,
            listaClientesInadimplentes: showAllDefaulters,
            clientesEmDia: showAllNonDefaulters.length,
            listaClientesEmDia: showAllNonDefaulters
        });
    } catch (error) {
        displayError(error, res);
    }
}

module.exports = clientsSummary;