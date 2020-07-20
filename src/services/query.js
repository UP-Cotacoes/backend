const request = require('request');
const { BASE_URL_CEP, BASE_URL_CNPJ, INVALID_CNPJ } = require('../config/constants');

module.exports = {
    async queryCnpj(req, res) {
        const { cnpj } = req.body;
        if (!cnpj) return res.status(400).json({status: 'Sem CNPJ ou CEP para validar.'});
        
        const url = BASE_URL_CNPJ.concat(cnpj);

        request({url}, function(err, response, body) {
            try {
                const data = JSON.parse(body);

                if (data.message == INVALID_CNPJ)
                    return res.json({status: data.message});
                
                return res.json(data);
                
            } catch(err) {
                return (res.json({status: err}));
            }
        })
    },
    
    async queryCep(req, res) {
        const { cep } = req.body;
        if (!cep) return res.status(400).json({status: 'Sem CNPJ ou CEP para validar.'});
        const url = BASE_URL_CEP.concat(cep, '/json');

        request({url}, function(err, response, body) {
            try {
                return res.json(JSON.parse(body));  
            } catch(err) {
                return (res.json({status: err}));
            }
        })
    },
}