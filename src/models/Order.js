const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    products: [{
        product_name: String,
        brand: String,
        amount: Number,
        payment: String,
        freight: String,
        notes: String,
    }]
});

module.exports  = mongoose.model('Order', OrderSchema);
