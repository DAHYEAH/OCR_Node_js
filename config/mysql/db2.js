// db2
var mysql2 = require("mysql2")
var pool  = mysql2.createPool({
    host : '127.0.0.1',
    user : 'root',
    password : '_ook0105',
    database : 'mediation_server'
});
var promisePool = pool.promise();
module.exports = promisePool;