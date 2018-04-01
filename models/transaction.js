var dbConnection = require('../db').db();
var async = require('async');
var logger = require('../utils/log');
var revalidator = require('revalidator');
validator_transaction = require('../validator/transaction');
var Utils = require('../utils/utils');

function sendMessage(res, mg = 'Something went wrong.', code = 501) {
    res.send({
        'status': code,
        'message': mg,
    });
}

function create (req, res) {
    if (typeof req.session.user_id === 'undefined') {
        return res.send({
            'status': 401,
            'message': 'User is not logged in',
        });
    }
    var result = revalidator.validate(req.body.data, validator_transaction.create, { additionalProperties: false });
    if (!result.valid) {
        var errorThrown = Utils.replace_(result.errors);
        logger.info(errorThrown, __filename, null, req.originalUrl);
        return res.send({ 'status': 400, 'message': errorThrown });
    }
    const medLen = req.body.data.transaction.length;
    for (let i = 0; i < medLen; ++i) {
        var result = revalidator.validate(req.body.data.transaction[i], validator_transaction.create.properties, { additionalProperties: false });
        if (!result.valid) {
            var errorThrown = Utils.replace_(result.errors);
            logger.info(errorThrown, __filename, null, req.originalUrl);
            return res.send({ 'status': 400, 'message': errorThrown });
        }
    }
    dbConnection.getConnection(function(err, connection) {
        connection.beginTransaction(function(err) {
            if (err) return sendMessage(res);
            connection.query('INSERT INTO transaction (`owner`) VALUES (?)', [req.session.user_id], function (err, results) {
                if (err) {
                    logger.info(err, __filename, null, req.originalUrl);
                    connection.rollback(function() {
                        return sendMessage(res);
                    });
                } else {
                    const transactionId = results.insertId;
                    async.each(req.body.data.transaction, function(data, callback) {
                        connection.query('INSERT INTO transaction_detail (`transaction`, `medicine`, `quantity`) VALUES (?, ?, ?)',
                        [transactionId, data.medicine_id, data.quantity], function (errInner, innerResult) {
                            if (errInner) {
                                logger.info(errInner, __filename, null, req.originalUrl);
                            }
                            callback(errInner, innerResult);
                        });
                    }, function(er, rs) {
                        if (!er) {
                            connection.commit(function(err) {
                                if (err) return sendMessage(res);   
                                return sendMessage(res, 'Transaction created successfully!', 200);
                            });
                        } else {
                            connection.rollback(function() {
                                return sendMessage(res);
                            });
                        }
                    });
                }
            });
        });
    })
}

function get(req, res) {
    if (typeof req.session.user_id === 'undefined') {
        return res.send({
            'status': 401,
            'message': 'User is not logged in',
        });
    }
    dbConnection.query('SELECT * FROM transaction WHERE owner = ? ORDER BY time DESC', [req.session.user_id], function (err, results) {
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

function detail(req, res) {
    if (typeof req.session.user_id === 'undefined') {
        return res.send({
            'status': 401,
            'message': 'User is not logged in',
        });
    }
    var result = revalidator.validate(req.body.data, validator_transaction.detail, { additionalProperties: false });
    if (!result.valid) {
        var errorThrown = Utils.replace_(result.errors);
        logger.info(errorThrown, __filename, null, req.originalUrl);
        return res.send({ 'status': 400, 'message': errorThrown });
    }
    dbConnection.query('SELECT * FROM (select * from transaction_detail WHERE transaction = ?) as temp_table INNER JOIN medicine ON temp_table.medicine = medicine.id INNER JOIN transaction ON temp_table.transaction = transaction.id order by medicine.name ASC', [req.body.data.transaction_id], function (err, results) {
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

exports.create = create;
exports.get = get;
exports.detail = detail;
