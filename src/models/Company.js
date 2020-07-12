    const mongoose = require('mongoose');

    const CompanySchema = new mongoose.Schema({
        _id: {
            type: String,
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true,
        },
        address: {
            street: String,
            number: String,
            cep: String,
            state: String,
            city: String,
            neighborhood: String,
        },
        phone: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        branch: [{
            address: String,
            phone: String,
            cnpj: String,
        }]
    });

    mongoose.model('Company', CompanySchema);
