require('../models/OrderProvider');
const mongoose = require('mongoose');
const OrderProvider = mongoose.model('OrderProvider');

module.exports = {
    async listOrders(req, res) {
        const { category, provider, id } = req.body;
        
        if(!provider) return res.status(400).json({status: 'Usuário não é fornecedor.'});
        if(!id) return res.status(403).json({status: 'Usuário não autorizado.'});

        const orders = await OrderProvider.find({category: category});

        return res.status(200).json({status: orders});
    }
}