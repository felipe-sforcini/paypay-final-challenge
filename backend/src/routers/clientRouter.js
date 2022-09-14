const express = require('express');
const { detailClient } = require('../controllers/clients/detailClient');
const { editClient } = require('../controllers/clients/editClient');
const { registerClient } = require('../controllers/clients/registerClient');
const { showAllClients } = require('../controllers/clients/showAllClients');
const authToken = require('../middlewares/auth');

const clientRouter = express.Router();

clientRouter.post('/clientes', authToken, registerClient);
clientRouter.get('/clientes', authToken, showAllClients);
clientRouter.get('/clientes/:id', authToken, detailClient);
clientRouter.put('/clientes/:id', authToken, editClient);

module.exports = clientRouter;