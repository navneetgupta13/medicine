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
    dbConnection.query('UPDATE `transaction` SET `state`="RECEIVED" WHERE id = ?', [req.body.data.transaction_id], function (err, results) {
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
    FROM (SELECT users_table.*, transaction.id as transaction_id FROM (SELECT id, first_name, last_name, address, state, pincode, email, phone FROM users WHERE pincode = ? && type = "user") as users_table
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

exports.create = create;
exports.get = get;
exports.received = received;
exports.detail = detail;
exports.detailAdd = detailAdd;
exports.detailRemove = detailRemove;
exports.getAreaData = getAreaData;
exports.getAreaDataDetail = getAreaDataDetail;
