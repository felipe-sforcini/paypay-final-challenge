const yup = require('./config');

const chargeValidation = yup.object().shape({
    nome: yup.string().required('O campo nome é obrigatório.'),
    descricao: yup.string().required('O campo descrição é obrigatório'),
    vencimento: yup.date().required('O campo vencimento é obrigatório.'),
    valor: yup.number().required('O campo valor é obrigatório'),
    status: yup.string().required('É obrigatório informar o status da cobrança')
});

module.exports = {
    chargeValidation
}