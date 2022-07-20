/* mybatis $ npm i mybatis-mapper */
const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['./models/mybatis/sqlMapper.xml'])

/* mybatis query */
var format = {language: 'sql', indent: ' '}

/* mysql */
var mysql = require('../config/mysql/db');

module.exports ={
    getAllUser: function (req, res, next) {
        var param = {
            id : req.params.id
        }
        var query = mybatisMapper.getStatement('sqlMapper', 'getAllUser', param, format)
        mysql.query(query, (error, rows) => {
            console.log(rows);
            // res.send(rows);
            res.json(rows);
        });
    },
    // getIdUser: function(req, res, next){
    //     var param = {
    //         id : req.params.id
    //   }
    //   var query = mybatisMapper.getStatement('sqlMapper', 'getIdUser', param, format)
    //   mysql.query(query, (error, rows) => {
    //     console.log(rows);
    //     // res.send(rows);
    //     res.json(rows);
    //   });   
    // }
}
