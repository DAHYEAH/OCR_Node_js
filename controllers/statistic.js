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
        var param = {sqlcol : input_sqlcol};
        var arr = [];
        var count = 0;
        var i, sum = 0;
        var result = {};
        // var query = mybatisMapper.getStatement('statMapper', 'statistic', param, format)
        mysql.query('SELECT COUNT(*)as cnt FROM sow', (err,data)=>{
            count = data[0].cnt;
            mysql.query('SELECT '+ input_sqlcol+' from sow', (error, rows) => {
                console.log(Number(count));
                for(i = 0; i<Number(count); i++){
                    var temp =Object.values(rows[i])[0];
                    arr.push(temp);
                    sum = sum+Number(temp);
                }
                arr.push(sum/i);
                result['result'] = arr;
                res.json(result);
            });
        })        
    },
}
