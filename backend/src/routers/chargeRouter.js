const express = require('express');
const authToken = require('../middlewares/auth');
const registerCharge = require('../controllers/charges/registerCharge');
const showAllCharges = require('../controllers/charges/showAllCharges');
const showChargesByClient = require('../controllers/charges/showChargesByClient');
const editCharge = require('../controllers/charges/editCharge');
const deleteCharge = require('../controllers/charges/deleteCharge');
const detailCharge = require('../controllers/charges/detailCharge');

const chargeRouter = express.Router();

chargeRouter.post('/cobrancas/:idCliente', authToken, registerCharge);
chargeRouter.get('/cobrancas', authToken, showAllCharges);
chargeRouter.get('/cobrancas/clientes/:idCliente', authToken, showChargesByClient);
chargeRouter.get('/cobranca/:id', authToken, detailCharge);
chargeRouter.put('/cobrancas/:id', authToken, editCharge);
chargeRouter.delete('/cobrancas/:id', authToken, deleteCharge);

module.exports = chargeRouter;