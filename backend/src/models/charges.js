const knex = require('../connection');

async function findAllCharges() {
    return await knex('cobrancas').select('*');
}

async function findChargeById(id) {
    return await knex('cobrancas').where({ id }).first();
}

async function findChargesByClientId(idClient) {
    return await knex('cobrancas').where({ cliente_id: idClient });
}

async function saveChargeUpdate(id, req) {
    return await knex('cobrancas').where({ id }).update(req.body);
}

async function runDeleteCharge(cobranca) {
    return knex('cobrancas').where({ id: cobranca.id }).delete()
}

async function findAllChargesBySearch(search) {
    const query = knex('cobrancas');

    if (search && search != '') {
        if (!isNaN(search)) {
            parseInt(search)
            if (search && search != '') {
                query.orWhere('id', search);
            }
        } else {
            query.whereILike('nome', `%${search}%`)
        }
    }
    return query;
}

module.exports = {
    findAllCharges,
    findChargeById,
    findChargesByClientId,
    saveChargeUpdate,
    runDeleteCharge,
    findAllChargesBySearch
}