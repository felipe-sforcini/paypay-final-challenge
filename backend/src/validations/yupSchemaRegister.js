const yup = require('./config');

const userValidation = yup.object().shape({
    nome: yup.string().required('O campo nome é obrigatório.'),
    email: yup.string().email().required('O campo email é obrigatório'),
    senha: yup
        .string()
        .required('O campo senha é obrigatório.')
        .min(6)
        .trim('Somente caracteres válidos são permitidos no campo senha')
});

module.exports = {
    userValidation
}