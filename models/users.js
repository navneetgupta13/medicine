var dbConnection = require('../db').db();
var logger = require('../utils/log');
var revalidator = require('revalidator');
validator_users = require('../validator/users');
var Utils = require('../utils/utils');

function create (req, res) {
    const item = {};
    item.properties = validator_users.create.properties;
    var result = revalidator.validate(req.body.data, item, { additionalProperties: false });
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
    if (typeof req.session.user_id === 'undefined') {
        return res.send({
            'status': 401,
            'message': 'User is not logged in',
        });
    }
    dbConnection.query('SELECT name, phone, address, state, pincode, type, email FROM users WHERE is_deleted = 0 && id = ?', [req.session.user_id], function (err, results) {
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
    if (typeof req.session.user_id === 'undefined') {
        return res.send({
            'status': 401,
            'message': 'User is not logged in',
        });
    }
    let item = validator_users.update;
    var result = revalidator.validate(req.body.data, item, { additionalProperties: false });
    if (!result.valid) {
        var errorThrown = Utils.replace_(result.errors);
        logger.info(errorThrown, __filename, null, req.originalUrl);
        return res.send({ 'status': 400, 'message': errorThrown });
    }
    dbConnection.query('UPDATE users SET ? WHERE id = ? && is_deleted = 0', [req.body.data, req.session.user_id], function (err, updateResult) {
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
    if (typeof req.session.user_id === 'undefined') {
        return res.send({
            'status': 401,
            'message': 'User is not logged in',
        });
    }
    dbConnection.query('UPDATE users SET is_deleted = 1 WHERE id = ?', [req.session.user_id], function(err, updateResult) {
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
            req.session.destroy();
            return res.send({
                'status': 200,
                'message': 'Item deleted sucessfully!',
            });
        }
    });
}

function login (req, res) {
    var result = revalidator.validate(req.body.data, validator_users.login, { additionalProperties: false });
    if (!result.valid) {
        var errorThrown = Utils.replace_(result.errors);
        logger.info(errorThrown, __filename, null, req.originalUrl);
        return res.send({ 'status': 400, 'message': errorThrown });
    }
    dbConnection.query('SELECT * FROM users WHERE email = ? && is_deleted = 0', [req.body.data.email], function(err, results) {
        if (err) {
            logger.info(err, __filename, null, req.originalUrl);
            return res.send({
                'status': 501,
                'message': 'Something went wrong.',
            });
        } else if (results.length === 0 || results[0].password != req.body.data.password) {
            logger.info('Query didn\'t run', __filename, null, req.originalUrl);
            return res.send({
                'status': 401,
                'message': 'Either email or password is wrong.',
            });
        }
        req.session.user_id = results[0].id;
        req.session.email = req.body.data.email;
        delete results[0].password;
        delete results[0].is_deleted;
        delete results[0].time;
        return res.send({
            'status': 200,
            'message': 'User logged in successfully!',
            'data': results[0],
        });
    });
}

function logout (req, res) {
    req.session.destroy();
    return res.send({
        'status': 200,
        'message': 'User logged out.',
    });
}

exports.get = get;
exports.create = create;
exports.update = update;
exports.remove = remove;
exports.login = login;
exports.logout = logout;