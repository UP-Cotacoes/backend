require('../models/Company');
const mongoose = require('mongoose');
const Company = mongoose.model('Company');

module.exports = {
    async listAllCompanies(req, res) {
        const companies = await Company.find();
        return res.json(companies);
    },

    async registerCompany(req, res) {
        const data = req.body;
        const { email, _id } = data;
        const companyExists = await Company.find({$or: [{email: email}, {_id: _id}]});
        
        if (companyExists.length) {
            return res.json({status: 'CNPJ/Email já foi utilizado.'});
        }

        await Company.create(data);
        return res.json(data);
    },

    async updateCompany(req, res) {
        //TODO
    },
}