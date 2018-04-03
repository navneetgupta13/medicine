var dbConnection = require('../db').db();
var async = require('async');
var logger = require('../utils/log');
var revalidator = require('revalidator');
validator_transaction = require('../validator/ngo');
var Utils = require('../utils/utils');



function getAreaData(req, res) {
    if (typeof req.session.user_id === 'undefined') {
        return res.send({
            'status': 401,
            'message': 'User is not logged in',
        });
    }
    dbConnection.query(`SELECT users.pincode, SUM(transaction_detail.quantity) as totalMedicine FROM
    ((SELECT id, owner FROM transaction WHERE state = "PENDING") as temp_table
    LEFT JOIN users ON temp_table.owner = users.id)
    INNER JOIN transaction_detail ON temp_table.id = transaction_detail.transaction
    GROUP BY users.pincode ORDER BY totalMedicine DESC`, [], function (err, results) {
        if (err) {
            logger.info(err, __filename, null, req.originalUrl);
            return sendMessage(res);
        }
        res.send({
            'status': 200,
            'message': 'Transaction list',
            'data': results,
        });
    });
}

function getAreaDataDetail(req, res) {
    if (typeof req.session.user_id === 'undefined') {
        return res.send({
            'status': 401,
            'message': 'User is not logged in',
        });
    }
    var result = revalidator.validate(req.body.data, validator_transaction.getAreaDataDetail, { additionalProperties: false });
    if (!result.valid) {
        var errorThrown = Utils.replace_(result.errors);
        logger.info(errorThrown, __filename, null, req.originalUrl);
        return res.send({ 'status': 400, 'message': errorThrown });
    }
    dbConnection.query(`SELECT transaction_table.*, SUM(transaction_detail.quantity) as totalMedicine
    FROM (SELECT users_table.*, transaction.id as transaction_id FROM (SELECT id, name, address, state, pincode, email, phone FROM users WHERE pincode = ? && type = "user") as users_table
    INNER JOIN transaction ON transaction.owner = users_table.id WHERE transaction.state = "PENDING") as transaction_table
    INNER JOIN transaction_detail ON transaction_table.transaction_id = transaction_detail.transaction GROUP BY transaction_table.transaction_id ORDER BY totalMedicine DESC`, [req.body.data.pincode], function (err, results) {
        if (err) {
            logger.info(err, __filename, null, req.originalUrl);
            return sendMessage(res);
        }
        res.send({
            'status': 200,
            'message': 'Transaction list',
            'data': results,
        });
    });
}

exports.getAreaData = getAreaData;
exports.getAreaDataDetail = getAreaDataDetail;
