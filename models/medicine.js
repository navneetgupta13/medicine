var dbConnection = require('../db').db();
var logger = require('../utils/log');
var revalidator = require('revalidator');
validator_medicine = require('../validator/medicine');
var Utils = require('../utils/utils');

function get (req, res) {
    if (typeof req.session.user_id === 'undefined') {
        return res.send({
            'status': 401,
            'message': 'User is not logged in',
        });
    }
    var result = revalidator.validate(req.body.data, validator_medicine.get, { additionalProperties: false });
    if (!result.valid) {
        var errorThrown = Utils.replace_(result.errors);
        logger.info(errorThrown, __filename, null, req.originalUrl);
        return res.send({ 'status': 400, 'message': errorThrown });
    }
    dbConnection.query('SELECT * FROM medicine WHERE name LIKE ? ORDER BY name ASC LIMIT 10', [req.body.data.name + '%'], function (err, results) {
        if (err) {
            logger.info(err, __filename, null, req.originalUrl);
            return res.send({
                'status': 501,
                'message': 'Something went wrong.',
            });
        } else {
            return res.send({
                'status': 200,
                'message': 'Success!',
                'data': results
            });
        }
    });
}

exports.get = get;