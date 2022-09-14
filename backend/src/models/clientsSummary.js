const knex = require('../connection');

async function findAllDefaulters() {
    return await knex('clientes').where({ status: false });
}

async function findAllNonDefaulters() {
    return await knex('clientes').where({ status: true });
}

async function showAllDefaultersBySearch(search) {
    const query = knex('clientes');

    query.where({ status: false })
        .andWhere((q) => {
            if (search && search != '') {
                if (!isNaN(search)) {
                    parseInt(search)
                    if (search && search != '') {
                        q.whereILike('cpf', `%${search}%`)
                    }
                } else {
                    q.whereILike('nome', `%${search}%`)
                        .orWhereILike('email', `%${search}%`)
                }
            }
        })

    return query;
}

async function showAllNonDefaultersBySearch(search) {
    const query = knex('clientes');

    query.where({ status: true })
        .andWhere((q) => {
            if (search && search != '') {
                if (!isNaN(search)) {
                    parseInt(search)
                    if (search && search != '') {
                        q.whereILike('cpf', `%${search}%`)
                    }
                } else {
                    q.whereILike('nome', `%${search}%`)
                        .orWhereILike('email', `%${search}%`)
                }
            }
        })

    
    return query
}
module.exports = {
    findAllDefaulters,
    findAllNonDefaulters,
    showAllDefaultersBySearch,
    showAllNonDefaultersBySearch
}