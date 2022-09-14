const yup = require('./config');

const clientValidation = yup.object().shape({
    nome: yup.string().required('O campo nome é obrigatório.'),
    email: yup.string().email().required('O campo email é obrigatório'),
    cpf: yup
        .string()
        .required('O campo cpf é obrigatório.')
        .min(11)
        .max(11),
    telefone: yup
        .string()
        .required('O campo telefone é obrigatório')
        .min(8)
        .max(11)
});

module.exports = {
    clientValidation
}