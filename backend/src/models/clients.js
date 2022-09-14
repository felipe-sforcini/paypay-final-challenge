const knex = require('../connection');

async function findClientByEmail(email) {
    return await knex('clientes').where({ email }).first();
}

async function findClientByCpf(cpf) {
    return await knex('clientes').where({ cpf }).first();
}

async function findClientByPhone(telefone) {
    return await knex('clientes').where({ telefone }).first();
}

async function findAllClients() {
    return await knex('clientes').select('*');
}

async function findClientById(id) {
    return await knex('clientes').where({ id }).first();
}

async function findClientByClientId(cliente_id) {
    return await knex('clientes').where({ id: cliente_id }).first();
}

async function saveClientUpdated(id, req) {
    return await knex('clientes').where({ id }).update(req.body);
}

async function updateClientStatus(clientFound) {
    return await knex('clientes').update(clientFound).where({ id: clientFound.id });
}

async function findAllClientsBySearch(search) {
    const query = knex('clientes');

    if (search && search != '') {
        if (!isNaN(search)) {
            parseInt(search)
            if (search && search != '') {
                query.whereILike('cpf', `%${search}%`)
            }
        } else {
            query.whereILike('nome', `%${search}%`)
                .orWhereILike('email', `%${search}%`)
        }
    }
    return query;
}


module.exports = {
    findClientByEmail,
    findClientByCpf,
    findClientByPhone,
    findAllClients,
    findClientById,
    findClientByClientId,
    updateClientStatus,
    saveClientUpdated,
    findAllClientsBySearch
}