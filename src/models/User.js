const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
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
        phone: {
            type: String,
            required: true,
        },
        provider: {
            type: Boolean,
            default: false,
        },
        companies: [{
            name: {
                type: String,
                required: true,
            },
            cnpj: {
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
            
        }]
});

UserSchema.virtual('password').set(function (password) {
        this.password_hash = this.hashPassword(password);
    });

UserSchema.methods = {
    checkPassword: function(password) {
        const isCorrect = bcrypt.compare(password, this.password_hash);
        return isCorrect;
    },
    hashPassword: function(password) {
        if (!password) return;
        const passwordHash = bcrypt.hashSync(password, SALT_WORK_FACTOR);
        return passwordHash;
    }
}

module.exports = mongoose.model('User', UserSchema);
