const mongoose = require('mongoose');

const Order = mongoose.model('Company');

module.exports = {
    async listAllOrders(req, res) {
        const orders = await Order.find({company_id: req.company_id});
        return res.json(orders);
    },

    async sendOrder(req, res) {
    
    },

    async updateCompany(req, res) {
        
    },
}