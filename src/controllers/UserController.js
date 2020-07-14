require('../models/User');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = {
    async create(req, res) {
        const data = req.body;
        const { email, password, confirm_password, phone } = data;
        const userExists = await User.findOne({email});
        const phoneExists = await User.findOne({phone});

        if (!data.length)
            return res.status(400).json({status: 'Preencha o campo vazio'});

        if (userExists) 
            return res.status(400).json({status: 'Email já foi utilizado.'});

        if (phoneExists) 
            return res.status(400).json({status: 'Número já está sendo utilizado.'});

        if (!(password === confirm_password)) 
            return res.status(400).json({status: 'As senhas são diferentes.'});
        
        if (!(10 <= data.phone.length <= 12)) return res.status(400).json({status: 'Numero inválido.'});
        
        const response = await User.create(data);
        return res.status(200).json({status: response});
    },

    async update(req, res) {
        //TODO
    },
}