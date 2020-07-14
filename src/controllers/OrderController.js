require('../models/Order');
const mongoose = require('mongoose');
const Order = mongoose.model('Order');
const OrderProvider = require('../models/OrderProvider');
const User = require('../models/User');

module.exports = {
    async listOrders(req, res) {
        const id = req.body.id;
        if (!id) return res.status(403).json({status: 'Não autorizado.'});

        const orders = await Order.find({company_id: id});
        return res.status(200).json(orders);
    },

    async sendOrder(req, res) {
        const { id, products } = req.body;

        if (!(id)) return res.json({status: 'Não autorizado'});
        const user = await User.findOne({_id: id});
        
        if (user.provider) return res.status(400).json({status: 'Não autorizado.'});

        if(!products) 
            return res.status(400).json({status: 'Não há produtos no pedido.'});
        
        //Envia pra tabela de pedidos do ponto de vista do fornecedor
        products.map(async function(product) {
            await OrderProvider.create({
                company_id: id,
                brand: product.brand,
                amount: product.amount,
                notes: product.notes,
                product_name: product.name,
                category: product.category
            });
        });

        const order = {
            company_id: id,
            products: products,
        }
        
        await Order.create(order);
        return res.status(200).json({status: 'Pedido enviado'});
    },
}