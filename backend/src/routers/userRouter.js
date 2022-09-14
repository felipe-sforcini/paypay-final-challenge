const express = require('express');
const editUser = require('../controllers/users/editUser');
const login = require('../controllers/users/login');
const { register } = require('../controllers/users/register');
const { showAllUsers } = require('../controllers/users/showAllUsers');
const userDetail = require('../controllers/users/userDetail')
const authToken = require('../middlewares/auth');


const userRouter = express.Router();

userRouter.post('/usuario', register);
userRouter.post('/login', login);
userRouter.put('/usuario', authToken, editUser);
userRouter.get('/usuarios', showAllUsers);
userRouter.get('/usuario', authToken, userDetail);

module.exports = userRouter