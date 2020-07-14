const mongoose = require('mongoose');

const OrderProviderSchema = new mongoose.Schema({
    company_id: {
        type: String,
        required: true,
    },
    product_name: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    notes: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    }
});

module.exports  = mongoose.model('OrderProvider', OrderProviderSchema);
