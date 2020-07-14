const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    company_id: {
        type: String,
        required: true,
    },
    products: [{
        product_name: String,
        brand: String,
        amount: Number,
        notes: String,
        category: String,
    }],
});

module.exports  = mongoose.model('Order', OrderSchema);
