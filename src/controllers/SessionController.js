require('../models/Company');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const Company = mongoose.model('Company');

module.exports = {
    async createSession(req, res) {
        if (req.body._id || req.body.email) {
            const company = await Company.findOne({$or: [{email: req.body.email}, {_id: req.body._id}]});
            const id = req.body._id;
            
            if (!company) return res.json({status: 'Empresa não registrada.'});

            const correctPassword = company.checkPassword(req.body.password);

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
}