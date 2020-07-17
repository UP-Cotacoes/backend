const BASE_URL_CNPJ = "https://www.receitaws.com.br/v1/cnpj/";
const BASE_URL_CEP = "https://viacep.com.br/ws/"
const request = require('request');
module.exports = {
    async validateCnpj(req, res) {
        const { cnpj } = req.body;
        if(!cnpj) return res.status(400).json({status: 'Digite o CNPJ'});
        url = BASE_URL_CNPJ + cnpj;
        request({url}, function(err, response, body) {
            return res.json(JSON.parse(body));
        })
    },
    async validateCep(req, res) {
        const { cep } = req.body;
        if (!cep) return res.status(400).json({status: 'Digite o CEP'});
        url = BASE_URL_CEP + cep + '/json';
        console.log(url);
        request({url}, function (err, response, body) {
            return res.json(JSON.parse(body));
        })
    }
}