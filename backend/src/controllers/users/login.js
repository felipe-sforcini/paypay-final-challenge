const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const jwtSecret = require('../../jwtSecret');
const { validationLogin } = require('../../validations/yupSchemaLogin');
const { findUserByEmail } = require('../../models/users');


const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        await validationLogin.validate(req.body);

        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(400).json({ mensagem: "E-mail não existe no cadastro." });
        }

        const validatePassword = await bcrypt.compare(senha, user.senha);

        if (!validatePassword) {
            return res.status(400).json({ mensagem: "E-mail e/ou senha inválido(s)." });
        }

        const token = jwt.sign({
            id: user.id
        }, jwtSecret, {
            expiresIn: "8h"
        });


        return res.status(200).json({
            user: {
                id: user.id,
                nome: user.nome,
                email: user.email
            },
            token
        })
    } catch (error) {
        return res.status(400).json({ mensagem: error.message });
    }

}

module.exports = login;