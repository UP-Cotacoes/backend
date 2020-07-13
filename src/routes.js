const express = require('express');
const routes = express.Router();
const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');
const auth = require('./middleware/auth');
const CNPJ = require('./services/CNPJ');

//rotas principais
routes.post('/register', UserController.create);
routes.post('/sessions', SessionController.createSession);


routes.post('/cnpj/validate', CNPJ.validate);

//testes
routes.use(auth.authMiddleware);
routes.get('/companies', SessionController.listCompanies);


module.exports = routes;