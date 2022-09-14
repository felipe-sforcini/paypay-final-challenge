const express = require('express');
const userRouter = require('../src/routers/userRouter');
const clientRouter = require('../src/routers/clientRouter');
const chargeRouter = require('../src/routers/chargeRouter');
const summaryRouter = require('../src/routers/summaryRouter');

const routes = express();

routes.use(userRouter);
routes.use(clientRouter);
routes.use(chargeRouter);
routes.use(summaryRouter)

module.exports = routes;