var requestHandlers = require('../models/users');

var handle = {};
handle['get'] = requestHandlers.get;
handle['create'] = requestHandlers.create;
handle['update'] = requestHandlers.update;
handle['remove'] = requestHandlers.remove;

exports.handle = handle;