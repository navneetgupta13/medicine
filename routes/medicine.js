var requestHandlers = require('../models/medicine');

var handle = {};
handle['get'] = requestHandlers.get;

exports.handle = handle;