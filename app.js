var bodyParser = require('body-parser');
var express = require('express');
var helmet = require('helmet');
var logger = require('./utils/log.js');
var path = require('path');


var app = express();
var port = process.env.PORT || 3000;

app.use(helmet.hidePoweredBy({ setTo: 'PHP/5.4.0' }));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(express.static(__dirname+'/app/'));

app.use('/api/*', function(req, res) {
    logger.info('/api/*');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    logger.info("-----Start Body-----", req.body, "-----End Body-----");
    var str = req.originalUrl;
    try {
        str = str.substring(5);
        var n = str.indexOf("/");
        var resstr = str.substring(0, n);
        var pkg_path = "./routes/" + resstr;
        var func_path = str.substring(n + 1);
        var pkg = require(pkg_path);
    } catch (e) {
        logger.info(e);
        logger.info(e, __filename, (req.user != null) ? req.user.id : null, req.originalUrl);
        return res.send({ 'status': 400, 'message': { 'path': 'Invalid Request Path' } });
    }
    if (pkg && typeof pkg.handle[func_path] === 'function')
        pkg.handle[func_path](req, res);
    else {
        logger.info('Invalid Request Path - 2', __filename, (req.user != null) ? req.user.id : null, req.originalUrl);
        return res.send({ 'status': 400, 'message': { 'path': 'Invalid Request Path' } });
    }
});

app.get('/favicon.ico', function(req, response) {
    logger.info('/favicon.ico');
    return response.sendStatus(200);
});

app.get('*', function(req, response) {
    logger.info('*');
    return response.sendFile(path.join(__dirname, '../app/index.html'));
});

app.listen(port, function() {
    logger.info('------- Server Listening at ', port, ' -------');
});