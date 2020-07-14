const express = require('express');
const routes = express.Router();
const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');
const OrderController = require('./controllers/OrderController');
const auth = require('./middleware/auth');
const cnpj = require('./services/cnpj');


//rotas principais
routes.post('/register', UserController.create);
routes.post('/sessions', SessionController.createSession);

routes.post('/cnpj/validate', cnpj.validate);

//testes
routes.use(auth.authMiddleware);
routes.post('/order', OrderController.sendOrder);
routes.get('/orders', OrderController.listAllOrders);
routes.get('/companies', SessionController.listCompanies);



module.exports = routes;