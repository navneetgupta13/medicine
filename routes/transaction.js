var requestHandlers = require('../models/transaction');

var handle = {};
handle['create'] = requestHandlers.create;
handle['get'] = requestHandlers.get;
handle['detail'] = requestHandlers.detail;
handle['get-area-data'] = requestHandlers.getAreaData;

exports.handle = handle;