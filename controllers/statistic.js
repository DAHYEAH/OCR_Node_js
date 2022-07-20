/* mybatis $ npm i mybatis-mapper */
const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['./models/mybatis/stat/statMapper.xml'])

/* mybatis query */
var format = {language: 'sql', indent: ' '}
/* mysql */
var mysql = require('../config/mysql/db');

module.exports ={
    inputcolumn: function (req,res,next){
        res.render('statistic');
    },

    statistic: function (req, res, next) {
        var input_sqlcol = req.body.sqlcol;
        var param = {
            sqlcol : input_sqlcol
        }
        console.log(input_sqlcol)
        var query = mybatisMapper.getStatement('statMapper', 'statistic', param, format)
        mysql.query(query, (error, rows) => {
            console.log(rows);
            // res.send(rows);
            res.json(rows);
        });
    },
}
