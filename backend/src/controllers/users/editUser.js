const bcrypt = require('bcrypt');
const { findUserByEmail, findUserById, saveUserUpdated, findUserbyCpf } = require('../../models/users')
const { editUserValidation } = require('../../validations/yupSchemaEditUser');


const editUser = async (req, res) => {
    const { id: userId } = req.user;

    const { nome, email, senha, cpf, telefone } = req.body;

    try {
        await editUserValidation.validate(req.body);

        const userFound = await findUserById(userId);

        if (!userFound) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado.' })
        }

        if (userFound.email !== email) {

            const existsEmail = await findUserByEmail(email);

            if (existsEmail) {
                return res.status(400).json({ mensagem: 'O e-mail informado já está sendo utilizado por outro usuário.' })
            }
        }

        if (cpf && userFound.cpf !== cpf) {

            const cpfExists = await findUserbyCpf(cpf);

            if (cpfExists) {
                return res.status(400).json({ mensagem: 'O CPF informado já está sendo utilizado por outro usuário.' })
            }
        }

        if (senha !== null) {
            const encryptedPassword = await bcrypt.hash(senha, 10);

            const updatedUser = await saveUserUpdated({ nome, email, senha: encryptedPassword, cpf, telefone }, userId);

            if (!updatedUser) {
                return res.status(400).json({ mensagem: 'Não foi possível atualizar o usuário.' });
            }
        }

        const updatedUser = await saveUserUpdated({ nome, email, cpf, telefone }, userId);

        if (!updatedUser) {
            return res.status(400).json({ mensagem: 'Não foi possível atualizar o usuário.' });
        }

        return res.status(200).json({ mensagem: 'Usuário atualizado com sucesso' });
    } catch (error) {
        return res.status(400).json({ mensagem: error.message });
    };
};

module.exports = editUser
