const express = require('express');
const cashSummary = require('../controllers/summaries/cashSummary');
const chargesSummary = require('../controllers/summaries/chargesSummary');
const clientsSummary = require('../controllers/summaries/clientsSummary');
const authToken = require('../middlewares/auth');

const summaryRouter = express.Router();

summaryRouter.get('/resumo/dinheiro', authToken, cashSummary);
summaryRouter.get('/resumo/cobrancas', authToken, chargesSummary);
summaryRouter.get('/resumo/clientes', authToken, clientsSummary);

module.exports = summaryRouter;