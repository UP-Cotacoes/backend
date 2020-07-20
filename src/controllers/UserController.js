require('../models/User');
require('../models/CnpjToValidate');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const { CNPJ_UNDER_REVIEW } = require('../config/constants');
const CnpjToValidate = require('../models/CnpjToValidate');

module.exports = {
    async create(req, res) {
        const data = req.body;
        const { email, password, confirm_password, phone, companies } = data;
        const userExists = await User.findOne({email});
        const phoneExists = await User.findOne({phone});

        if (!data)
            return res.status(400).json({status: 'Preencha o(s) campo(s) vazio(s).'});

        if (userExists) 
            return res.status(400).json({status: 'Email já foi utilizado.'});

        if (phoneExists) 
            return res.status(400).json({status: 'Número já está sendo utilizado.'});

        if (!(password === confirm_password)) 
            return res.status(400).json({status: 'As senhas são diferentes.'});
        
        
        if (!(10 <= data.phone.length <= 12)) return res.status(400).json({status: 'Numero inválido.'});

        const response = await User.create(data);
        
        companies.map(({cnpj_status, cnpj}) => {
            if (cnpj_status == CNPJ_UNDER_REVIEW) {
                CnpjToValidate.create({user_id: response._id, cnpj: cnpj});
            }
        });
        
        return res.status(200).json({status: response});
    },

    async update(req, res) {
        //TODO
    },
    async delete(req, res) {

    }
}