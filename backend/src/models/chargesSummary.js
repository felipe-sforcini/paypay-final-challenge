const knex = require('../connection');

async function findAllPendingCharges() {
    return await knex('cobrancas').select('*').where({ status: 'pendente' });
}

async function findAllPaidCharges() {
    return await knex('cobrancas').select('*').where({ status: 'paga' });
}

async function findAllOverdueCharges() {
    return await knex('cobrancas').select('*').where({ status: 'vencida' });
}

async function showPaidChargesBySearch(search) {
    const query = knex('cobrancas');

    query.where({status: 'paga'})
    .andWhere((q)=>{
        if (search && search != '') {
            if (!isNaN(search)) {
                parseInt(search)
                if (search && search != '') {
                    q.orWhere('id', search);
                }
            } else {
                q.whereILike('nome', `%${search}%`)
            }
        }
    })
    return query
}

async function showOverdueChargesBySearch(search) {
    const query = knex('cobrancas');

    query.where({status: 'vencida'})
    .andWhere((q)=>{
        if (search && search != '') {
            if (!isNaN(search)) {
                parseInt(search)
                if (search && search != '') {
                    q.orWhere('id', search);
                }
            } else {
                q.whereILike('nome', `%${search}%`)
            }
        }
    })
    return query
}

async function showPendingChargesBySearch(search) {
    const query = knex('cobrancas');

    query.where({status: 'pendente'})
    .andWhere((q)=>{
        if (search && search != '') {
            if (!isNaN(search)) {
                parseInt(search)
                if (search && search != '') {
                    q.orWhere('id', search);
                }
            } else {
                q.whereILike('nome', `%${search}%`)
            }
        }
    })
    return query
}

module.exports = {
    findAllPaidCharges,
    findAllOverdueCharges,
    findAllPendingCharges,
    showPaidChargesBySearch,
    showOverdueChargesBySearch,
    showPendingChargesBySearch
}