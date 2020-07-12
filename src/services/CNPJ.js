const base_URL = "https://www.receitaws.com.br/v1/cnpj/";
const request = require('request');

module.exports = {
    async validation(req, res) {
        const { _id } = req.body;
        url = base_URL + _id;
        request({url: url}, function(err, response, body) {
            return res.json(JSON.parse(body));
        })
    }
}