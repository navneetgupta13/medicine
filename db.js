var mysql = require('mysql');

var db = null;
var MYSQL_HOST = 'localhost';
var MYSQL_USER = 'root';
var MYSQL_PASSWORD = '';
var MYSQL_DATABASE = 'medicine';

if (process.env.ENVMNT == 'easyway-prod' || process.env.ENVMNT == 'easy-test') {
    MYSQL_HOST = process.env.MYSQLHOST || MYSQL_HOST;
    MYSQL_USER = process.env.MYSQLUSER;
    MYSQL_PASSWORD = process.env.MYSQLPASSWORD;
    MYSQL_DATABASE = process.env.MYSQLDB;
}

var options = {
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    connectionLimit: 10
};

if (process.env.SOCKET_PATH) options.socketPath = process.env.SOCKET_PATH;
if (process.env.MYSQLPORT) options.port = process.env.MYSQLPORT;

console.log(options);

exports.db = function() {
    if (db == null) db = mysql.createPool(options);
    return db;
}
