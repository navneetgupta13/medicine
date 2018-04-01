var requestHandlers = require('../models/transaction');

var handle = {};
handle['create'] = requestHandlers.create;
handle['get'] = requestHandlers.get;
handle['detail'] = requestHandlers.detail;

exports.handle = handle;