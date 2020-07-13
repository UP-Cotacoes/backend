require('../models/User');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = {
    async create(req, res) {
        const data = req.body;
        const { email, password, confirm_password, phone } = data;
        const userExists = await User.findOne({email});
        const phoneExists = await User.findOne({phone});

        if (userExists) 
            return res.json({status: 'Email já foi utilizado.'});

        if (phoneExists) 
            return res.json({status: 'Número já está sendo utilizado.'});

        if (!(password === confirm_password)) 
            return res.json({status: 'As senhas são diferentes.'});
        
        await User.create(data);
        return res.json(data);
    },

    async update(req, res) {
        //TODO
    },
}