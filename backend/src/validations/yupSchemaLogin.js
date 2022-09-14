const yup = require('./config');

const validationLogin = yup.object().shape({
    email: yup.string().email().required('O campo e-mail é obrigatório.'),
    senha: yup.string().required('O campo senha é obrigatório.')
});

module.exports = {
    validationLogin
}