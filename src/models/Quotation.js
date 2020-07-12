const mongoose = require('mongoose');

const QuotationSchema = new mongoose.Schema({
    company_id: {
        type: Number,
        required: true,
    },
    products: [{
        product_name: String,
        brand: String,
        amount: Number,
        payment: String,
        freight: String,
        notes: String,
        shipping_deadline: String,
        expiring_date: String
    }]
});

mongoose.model('Quotation', QuotationSchema);
