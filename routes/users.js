var requestHandlers = require('../models/users');

var handle = {};
handle['get'] = requestHandlers.get;
handle['create'] = requestHandlers.create;
handle['update'] = requestHandlers.update;
handle['remove'] = requestHandlers.remove;
handle['login'] = requestHandlers.login;
handle['logout'] = requestHandlers.logout;

exports.handle = handle;