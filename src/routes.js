const express = require('express');
const routes = express.Router();
const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');
const OrderController = require('./controllers/OrderController');
const OrderProviderController = require('./controllers/OrderProviderController');

const auth = require('./middleware/auth');
const services = require('./services/query');

//Rotas principais
routes.post('/register', UserController.create);
routes.post('/sessions', SessionController.createSession);

//Services
routes.post('/services/query', services.query);

//Somente autenticado pode usar essas rotas
routes.use(auth.authMiddleware);
routes.post('/order', OrderController.sendOrder);

routes.get('/orders', OrderController.listOrders);
routes.get('/companies', SessionController.listCompanies);

//Endpoints para usuários fornecedores
routes.get('/provider/orders', OrderProviderController.listOrders);

module.exports = routes;