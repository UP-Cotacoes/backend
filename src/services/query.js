const BASE_URL_CNPJ = "https://www.receitaws.com.br/v1/cnpj/";
const BASE_URL_CEP = "https://viacep.com.br/ws/"
const request = require('request');
module.exports = {
    async query(req, res) {
        const { cnpj, cep } = req.body;
        if(!cnpj && !cep) return res.status(400).json({status: 'Sem CNPJ ou CEP para validar.'});
        if (!cnpj && cep) url = BASE_URL_CEP + cep + '/json';
        if (cnpj && !cep) url = BASE_URL_CNPJ + cnpj;
        
        request({url}, function(err, response, body) {
            return res.json(JSON.parse(body));
        })
    },
}