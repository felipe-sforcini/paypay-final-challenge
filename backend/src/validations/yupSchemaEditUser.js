const yup = require('./config');

const editUserValidation = yup.object().shape({
    nome: yup.string().required('O campo nome é obrigatório.'),
    email: yup.string().email().required('O campo email é obrigatório'),
});

module.exports = {
    editUserValidation
}