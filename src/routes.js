const express = require('express');
const routes = express.Router();
const CompanyController = require('./controllers/CompanyController');
const SessionController = require('./controllers/SessionController');
const CNPJ = require('./services/CNPJ');

//rotas principais
routes.post('/register', CompanyController.registerCompany);
routes.post('/sessions', SessionController.createSession);

//util
routes.post('/cnpj_validation', CNPJ.validate);

//testes
routes.get('/companies', CompanyController.listAllCompanies);

module.exports = routes;