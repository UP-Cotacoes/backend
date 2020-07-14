require('../models/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const User = mongoose.model('User');

module.exports = {
    async createSession(req, res) {

        const data = req.body;
        if (!data) return res.status(400).json({status: 'Preencha os campos vazios'});

        if (req.body.email && req.body.password) {
            const user = await User.findOne({email: req.body.email});
            
            if (!user) return res.status(400).json({status: 'Usuário não registrado.'});
            
            const correctPassword = await user.checkPassword(req.body.password);
            
            const id = user._id;
            const provider = user.provider;
            const category = user.category;
    
            if (correctPassword) {
                return res.status(200).json({
                    token: jwt.sign({id, provider, category}, authConfig.secret, {
                        expiresIn: authConfig.expiresIn,
                    })
                })
            }
            return res.status(400).json({status: 'Senha incorreta'});
        }

        return res.status(400).json({status: 'Campo vazio'});
    },

    async listCompanies(req, res) {
        const user = await User.findOne({_id: req.body.id});
        
        if (!user) return res.json({status: 'Usuário não encontrado.'});

        return res.status(200).json(user.companies);
    },
}