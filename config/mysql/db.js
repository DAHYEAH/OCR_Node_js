/* mysql setting */
const mysql = require('mysql');
const connection = mysql.createConnection({
  host : '127.0.0.1',
  port : '3306',
  user : 'root',
  password : '_ook0105',
  database : 'mediation_server'
});

module.exports = connection;