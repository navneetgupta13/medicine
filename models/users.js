var dbConnection = require('../db').db();
var logger = require('../utils/log');
var revalidator = require('revalidator');
validator_users = require('../validator/users');
var Utils = require('../utils/utils');

function create (req, res) {
    var result = revalidator.validate(req.body.data, validator_users.create, { additionalProperties: false });
    if (!result.valid) {
        var errorThrown = Utils.replace_(result.errors);
        logger.info(errorThrown, __filename, null, req.originalUrl);
        return res.send({ 'status': 400, 'message': errorThrown });
    }
    
    dbConnection.query('INSERT INTO users SET ?', req.body.data, function (err, results) {
        if (err) {
            logger.info(err, __filename, null, req.originalUrl);
            return res.send({
                'status': 501,
                'message': 'Something went wrong.',
            });
        } else {
            return res.send({
                'status': 200,
                'message': 'Item added sucessfully!',
                'data': { id: results.insertId }
            });
        }
    });
}

function get (req, res) {
    dbConnection.query('SELECT email, first_name, last_name, phone FROM users WHERE is_deleted = false', [], function (err, results) {
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

function update (req, res) {
    var result = revalidator.validate(req.body.data, validator_users.update, { additionalProperties: false });
    if (!result.valid) {
        var errorThrown = Utils.replace_(result.errors);
        logger.info(errorThrown, __filename, null, req.originalUrl);
        return res.send({ 'status': 400, 'message': errorThrown });
    }
    dbConnection.query('UPDATE users SET ? WHERE id = ?', [req.body.data, req.body.data.email], function (err, updateResult) {
        if (err) {
            logger.info(err, __filename, null, req.originalUrl);
            return res.send({
                'status': 501,
                'message': 'Something went wrong.',
            });
        } else if (!updateResult.affectedRows) {
            logger.info('Query didn\'t run', __filename, null, req.originalUrl);
            return res.send({
                'status': 401,
                'message': 'Invalid data format.',
            });
        } else {
            return res.send({
                'status': 200,
                'message': 'Item updated sucessfully!',
            });
        }
    });
}

function remove (req, res) {
    var result = revalidator.validate(req.body.data, validator_users.remove, { additionalProperties: false });
    if (!result.valid) {
        var errorThrown = Utils.replace_(result.errors);
        logger.info(errorThrown, __filename, null, req.originalUrl);
        return res.send({ 'status': 400, 'message': errorThrown });
    }
    dbConnection.query('UPDATE users SET is_deleted = true WHERE id = ?', [req.body.data.email], function(err, updateResult) {
        if (err) {
            logger.info(err, __filename, null, req.originalUrl);
            return res.send({
                'status': 501,
                'message': 'Something went wrong.',
            });
        } else if (!updateResult.affectedRows) {
            logger.info('Query didn\'t run', __filename, null, req.originalUrl);
            return res.send({
                'status': 401,
                'message': 'Invalid data format.',
            });
        } else {
            return res.send({
                'status': 200,
                'message': 'Item deleted sucessfully!',
            });
        }
    });
}

exports.get = get;
exports.create = create;
exports.update = update;
exports.remove = remove;