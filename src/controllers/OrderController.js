require('../models/Order');
const mongoose = require('mongoose');
const Order = mongoose.model('Order');

module.exports = {
    async listAllOrders(req, res) {
        const id = req.body.id;
        if (!id) return res.status(403).json({status: 'Não autorizado.'});
        const orders = await Order.find({company_id: id});
        return res.status(200).json(orders);
    },

    async sendOrder(req, res) {
        const { id, products } = req.body;

        if (!(id)) return res.json({status: 'Não autorizado'});
        
        if(!products.length) 
            return res.status(400).json({status: 'Não há produtos no pedido.'});

        const order = {
            company_id: id,
            products: products,
        }
        
        await Order.create(order);
        return res.status(200).json({status: 'Pedido enviado'});
    },
}