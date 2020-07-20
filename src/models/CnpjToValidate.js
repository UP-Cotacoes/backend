const mongoose = require('mongoose');

const CnpjToValidateSchema = new mongoose.Schema({
        cnpj: {
            type: String,
            required: true
        },
        user_id: {
            type: String,
            required: true
        },
});

module.exports = mongoose.model('CnpjToValidate', CnpjToValidateSchema, 'cnpjstovalidate');
