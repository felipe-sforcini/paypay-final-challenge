const { findUserById } = require('../../models/users')

const userDetail = async (req, res) => {
    const { id: userId } = req.user;

    try {
        const userFound = await findUserById(userId);

        if (!userFound) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado.' })
        }

        return res.status(200).json({
            id: userFound.id,
            nome: userFound.nome,
            email: userFound.email,
            cpf: userFound.cpf,
            telefone: userFound.telefone
        });
    } catch (error) {
        return res.status(400).json({ mensagem: error.message });
    };
};

module.exports = userDetail;
