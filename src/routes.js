const express = require('express');
const routes = express.Router();
const CompanyController = require('./controllers/CompanyController');
const CNPJ = require('./services/CNPJ');

routes.post('/register', CompanyController.register);
routes.post('/cnpj_validation', CNPJ.validation);

routes.get('/companies', CompanyController.list);

module.exports = routes;