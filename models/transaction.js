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
    let transactionExist = false;
    let transactionId;
    dbConnection.query('SELECT * FROM transaction where `owner` = ? && state = "PENDING"', [req.session.user_id], function (err, results) {
        if (err) return sendMessage(res);
        if (results.length > 0) { 
            transactionExist = true;
            transactionId = results[0].id;
        }
        dbConnection.getConnection(function(err, connection) {
            connection.beginTransaction(function(err) {
                const callback = (err, results) => {
                    async.each(req.body.data.transaction, function(data, callback) {
                        connection.query('INSERT INTO transaction_detail (`transaction`, `medicine`, `quantity`, `expiry`) VALUES (?, ?, ?, ?)',
                        [transactionId, data.medicine_id, data.quantity, data.expiry], function (errInner, innerResult) {
                            if (errInner) {
                                logger.info(errInner, __filename, null, req.originalUrl);
                            }
                            callback(errInner, innerResult);
                        });
                    }, function(er, rs) {
                        if (!er) {
                            connection.commit(function(err) {
                                if (err) return sendMessage(res);   
                                return res.send({
                                    'status': 200,
                                    'message': 'Transaction created successfully!',
                                    'data': {
                                        'transaction_id': transactionId,
                                    }
                                });
                            });
                        } else {
                            connection.rollback(function() {
                                return sendMessage(res);
                            });
                        }
                    });
                };
                if (err) return sendMessage(res);
                if (!transactionExist) {
                    connection.query('INSERT INTO transaction (`owner`) VALUES (?)', [req.session.user_id], function(err, results) {
                        if (err) {
                            logger.info(err, __filename, null, req.originalUrl);
                            connection.rollback(function() {
                                return sendMessage(res);
                            });
                        } else {
                            transactionId = results.insertId;
                            callback();
                        }
                    });
                } else callback();
            });
        });
    });
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

function received(req, res) {
    if (typeof req.session.user_id === 'undefined') {
        return res.send({
            'status': 401,
            'message': 'User is not logged in',
        });
    }
    var result = revalidator.validate(req.body.data, validator_transaction.received, { additionalProperties: false });
    if (!result.valid) {
        var errorThrown = Utils.replace_(result.errors);
        logger.info(errorThrown, __filename, null, req.originalUrl);
        return res.send({ 'status': 400, 'message': errorThrown });
    }
    time = Date.now();
    dbConnection.query('UPDATE `transaction` SET `state`="RECEIVED", `received_time`= LOCALTIMESTAMP() WHERE id = ? && state="PENDING"', [req.body.data.transaction_id], function (err, results) {
        if (err) {
            logger.info(err, __filename, null, req.originalUrl);
            return sendMessage(res);
        }
        if (results.affectedRows) {
            return res.send({
                'status': 200,
                'message': 'Transaction Received!',
            });
        }
        sendMessage(res);
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
    dbConnection.query(`SELECT * FROM
    ((SELECT id as transaction_detail_id, medicine, transaction, expiry, quantity FROM transaction_detail WHERE transaction = ?) as temp_table
    INNER JOIN medicine ON temp_table.medicine = medicine.id)
    INNER JOIN transaction ON temp_table.transaction = transaction.id ORDER BY medicine.name ASC`, [req.body.data.transaction_id], function (err, results) {
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

function detailAdd(req, res) {
    if (typeof req.session.user_id === 'undefined') {
        return res.send({
            'status': 401,
            'message': 'User is not logged in',
        });
    }
    var result = revalidator.validate(req.body.data, validator_transaction.detailAdd, { additionalProperties: false });
    if (!result.valid) {
        var errorThrown = Utils.replace_(result.errors);
        logger.info(errorThrown, __filename, null, req.originalUrl);
        return res.send({ 'status': 400, 'message': errorThrown });
    }
    dbConnection.query('SELECT * FROM transaction where owner = ? && id = ? && state = "PENDING"', [req.session.user_id, req.body.data.transaction_id], function (err, results) {
        if (err) {
            logger.info(err, __filename, null, req.originalUrl);
            return sendMessage(res);
        }
        if (results.length === 1) {
            dbConnection.query('INSERT INTO transaction_detail (`transaction`, `medicine`, `quantity`, `expiry`) VALUES (?, ?, ?, ?)', [req.body.data.transaction_id, req.body.data.medicine_id, req.body.data.quantity, req.body.data.expiry], function (err, results) {
                if (err) {
                    logger.info(err, __filename, null, req.originalUrl);
                    return sendMessage(res);
                } else {
                    res.send({
                        'status': 200,
                        'message': 'Medicine Added Succesfully!',
                    });
                }
            });
        } else {
            res.send({
                'status': 400,
                'message': 'Invalid Transaction Id',
                'data': results,
            });
        }
    });
}

function detailRemove(req, res) {
    if (typeof req.session.user_id === 'undefined') {
        return res.send({
            'status': 401,
            'message': 'User is not logged in',
        });
    }
    var result = revalidator.validate(req.body.data, validator_transaction.detailRemove, { additionalProperties: false });
    if (!result.valid) {
        var errorThrown = Utils.replace_(result.errors);
        logger.info(errorThrown, __filename, null, req.originalUrl);
        return res.send({ 'status': 400, 'message': errorThrown });
    }
    dbConnection.query(`SELECT transaction.id FROM
    (SELECT * FROM transaction_detail where id = ?) as tem_table
    LEFT JOIN transaction ON tem_table.transaction = transaction.id WHERE transaction.state = "PENDING" && transaction.owner = ?`, [req.body.data.transaction_detail_id, req.session.user_id], function (err, results) {
        if (err) {
            logger.info(err, __filename, null, req.originalUrl);
            return sendMessage(res);
        }
        if (results.length === 1) {
            const transaction_id = results[0].id;
            console.log(transaction_id);
            dbConnection.getConnection(function(err, connection) {
                connection.beginTransaction(function(err) {
                    if (err) return sendMessage(res);
                    connection.query('DELETE FROM transaction_detail WHERE id = ?', [req.body.data.transaction_detail_id], function (err, results) {
                        if (err) {
                            logger.info(err, __filename, null, req.originalUrl);
                            connection.rollback(function() {
                                return sendMessage(res);
                            });
                        } else {
                            connection.query('SELECT * FROM transaction_detail WHERE id = ?', [req.body.data.transaction_detail_id], function (err, results) {
                                if (err) {
                                    logger.info(err, __filename, null, req.originalUrl);
                                    connection.rollback(function() {
                                        return sendMessage(res);
                                    });
                                }
                                if (results.length === 0) {
                                    connection.query('DELETE FROM transaction WHERE id = ?', [transaction_id], function (err, results) {
                                        if (err) connection.rollback(function() {
                                            return sendMessage(res);
                                        });
                                        connection.commit(function(err) {
                                            if (err) return sendMessage(res);   
                                            return res.send({
                                                'status': 200,
                                                'message': 'Medicine Removed Successfully!',
                                            });
                                        });
                                    });
                                } else {
                                    connection.commit(function(err) {
                                        if (err) return sendMessage(res);   
                                        return res.send({
                                            'status': 200,
                                            'message': 'Medicine Removed Successfully!',
                                        });
                                    });
                                }
                            });
                        }
                    });
                });
            });
        } else {
            res.send({
                'status': 400,
                'message': 'Invalid transaction detail id',
                'data': results,
            });
        }
    });
}

exports.create = create;
exports.get = get;
exports.received = received;
exports.detail = detail;
exports.detailAdd = detailAdd;
exports.detailRemove = detailRemove;
