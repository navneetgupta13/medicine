var dbConnection = require('../db').db();
var logger = require('../utils/log');
var revalidator = require('revalidator');
validator_users = require('../validator/users');
var Utils = require('../utils/utils');

function create (req, res) {
    const item = {};
    item.properties = validator_users.create.properties;
    if (req.body.data.type === 'user' || req.body.data.type === 'ngo') {
        item.properties = JSON.parse(JSON.stringify(validator_users.create.properties));
        for (let obj in validator_users.create.remainingProps[req.body.data.type]) {
            item.properties[obj] = JSON.parse(JSON.stringify(validator_users.create.remainingProps[req.body.data.type][obj]));
        }
    }
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
    if (!req.session.email) {
        return res.send({
            'status': 401,
            'message': 'User is not logged in',
        });
    }
    dbConnection.query('SELECT org, first_name, last_name, phone FROM users WHERE is_deleted = 0 && email = ?', [req.session.email], function (err, results) {
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
    if (!req.session.email) {
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
    dbConnection.query('UPDATE users SET ? WHERE id = ? && is_deleted = 0', [req.body.data, req.session.email], function (err, updateResult) {
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
    if (!req.session.email) {
        return res.send({
            'status': 401,
            'message': 'User is not logged in',
        });
    }
    dbConnection.query('UPDATE users SET is_deleted = 1 WHERE email = ?', [req.session.email], function(err, updateResult) {
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
    dbConnection.query('SELECT password FROM users WHERE email = ? && is_deleted = 0', [req.body.data.email], function(err, results) {
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
        req.session.email = req.body.data.email;
        return res.send({
            'status': 200,
            'message': 'User logged in successfully!',
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