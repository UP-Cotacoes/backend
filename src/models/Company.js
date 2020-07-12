const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const SALT_WORK_FACTOR = 10;

const CompanySchema = new mongoose.Schema({
        _id: {
            type: String,
        },
        password_hash: {
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

CompanySchema.virtual('password').set(function (password) {
        this.password_hash = this.hashPassword(password);
    });

CompanySchema.methods = {
    checkPassword: function(password) {
        return bcrypt.compare(password, this.password_hash);
    },
    hashPassword: function(password) {
        if (!password) return;
        return bcrypt.hashSync(password, SALT_WORK_FACTOR);
    }
}

module.exports = mongoose.model('Company', CompanySchema);
