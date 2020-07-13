require('../models/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const User = mongoose.model('User');

module.exports = {
    async createSession(req, res) {
        if (req.body.email) {
            const user = await User.findOne({email: req.body.email});
            
            if (!user) return res.json({status: 'Empresa não registrada.'});

            const correctPassword = user.checkPassword(req.body.password);
            
            const id = user._id;

            if (correctPassword) {
                return res.json({
                    token: jwt.sign({id}, authConfig.secret, {
                        expiresIn: authConfig.expiresIn,
                    })
                })
            }
            return res.json({status: 'Senha incorreta'});
        }

        return res.json({status: 'Campo vazio'});
    },

    async listCompanies(req, res) {
        const user = await User.findOne({_id: req.body.id});
        
        if (!user) return res.json({status: 'Usuário não encontrado.'});

        return res.json(user.companies);
    },
}