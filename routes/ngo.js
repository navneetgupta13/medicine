var requestHandlers = require('../models/ngo');

var handle = {};
handle['get-area-data'] = requestHandlers.getAreaData;
handle['get-area-data-detail'] = requestHandlers.getAreaDataDetail;

exports.handle = handle;
