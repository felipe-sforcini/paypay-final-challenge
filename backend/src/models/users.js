const knex = require('../connection');

async function findUserByEmail(email) {
    return await knex('usuarios').where({ email }).first();
}

async function findUserById(id) {
    return await knex('usuarios').where({ id }).first();
}

async function findUserbyCpf(cpf) {
    return await knex('usuarios').where({ cpf }).first();
}

async function findAllUsers() {
    return await knex('usuarios').select('*');
}

async function saveUserUpdated({ nome, email, senha, cpf, telefone }, userId) {
    return await knex('usuarios')
        .where({ id: userId })
        .update({
            nome,
            email,
            senha,
            cpf,
            telefone
        });
}

module.exports = {
    findUserByEmail,
    findUserById,
    saveUserUpdated,
    findUserbyCpf,
    findAllUsers
}