require('../models/User');
require('../models/CnpjToValidate');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const CnpjToValidate = mongoose.model('CnpjToValidate');
const { 
    BASE_URL_CNPJ,
    CNPJ_UNDER_REVIEW,
    CNPJ_VALIDATED,
    INVALID_CNPJ,
    INVALID_CNPJ_MESSAGE,
} = require('../config/constants');

const request = require('request');

module.exports.save = async function(user_id, cnpj, status) {
    const actions_blocked = 0;
    
    if (status == INVALID_CNPJ || status == CNPJ_UNDER_REVIEW) 
        actions_blocked = 1;
    
    console.log(status, actions_blocked);

    const result = await User.updateOne({
        _id: user_id,
        'companies.cnpj': cnpj,
    },
    {
        '$set':
        {
            'companies.$.cnpj_status': status,
            'companies.$.actions_blocked': actions_blocked,
        }
    });

    console.log(result);
    return;
}

module.exports.validateCnpjsJob = async function() {
    const toValidate = await CnpjToValidate.find({}).limit(3);
    
    if (!toValidate.length) return;

    toValidate.map(({user_id, cnpj}) => {
        const url = BASE_URL_CNPJ.concat(cnpj);

        request(url, async (err, res, body) => {
            try {
                const data = JSON.parse(body);

                if (data.message == INVALID_CNPJ_MESSAGE){
                    await module.exports.save(user_id, cnpj, CNPJ_INVALID);
                    return;
                }
                
                await module.exports.save(user_id, cnpj, CNPJ_VALIDATED);
                await CnpjToValidate.deleteOne({user_id: user_id, cnpj: cnpj});
                return;

            } catch(err) {
                console.log(err);
                await module.exports.save(user_id, cnpj, CNPJ_UNDER_REVIEW);
                return;
            }
        });
    })
}
