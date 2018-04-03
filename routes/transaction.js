var requestHandlers = require('../models/transaction');

var handle = {};
handle['create'] = requestHandlers.create;
handle['get'] = requestHandlers.get;
handle['received'] = requestHandlers.received;
handle['detail'] = requestHandlers.detail;
handle['detail-add'] = requestHandlers.detailAdd;
handle['detail-remove'] = requestHandlers.detailRemove;

exports.handle = handle;