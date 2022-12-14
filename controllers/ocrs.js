/* mybatis $ npm i mybatis-mapper */
const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['./models/mybatis/ocrs/ocrMapper.xml'])

/* mybatis query */
var format = {language: 'sql', indent: ' '}

/* mysql */
var mysql = require('../config/mysql/db');
function getRandomInt(min, max) {//min ~ max 사이의 임의의 정수 반환
    return Math.floor(Math.random()*(max-min))+min;
}
module.exports ={
    ocrspage: function(req,res,next){
        res.send('this is ocrs page')
    },
    uploadimgpage: function(req,res,next){
        res.render('uploadimg')
    },
    uploadimg: function (req, res, next) {
        imagefile = req.body.Image;
        var dic = {}
        dic['sowID'] = getRandomInt(1,1000).toString();
        dic['birth'] = getRandomInt(1,1000).toString();
        var dic_val = Object.values(dic)
        console.log(dic_val);
        console.log(imagefile)

        // const params = [dic];
        // // var query = mybatisMapper.getStatement('sqlMapper', 'getAllUser', param, format)
        mysql.query("INSERT INTO sow VALUES (?,?)", dic_val, (error, rows) => {
            console.log(rows);
            // res.send(rows);
            res.json(rows);
        });
    },
    uploadocrpage: function(req,res,next){
        res.render('uploadocr')
    },
    uploadocr: function(req,res,next){
        sow = req.body.selected_sow;
        data = req.body.changed_data;
        var params = data.split(",");
        params.push(sow);
        console.log(params);
        
        // var query = mybatisMapper.getStatement('sqlMapper', 'getIdUser', param, format)
        mysql.query("UPDATE sow SET sowID=?, birth=? WHERE sowID=?",  params,(error, rows) => {
        console.log(rows);
        // res.send(rows);
        res.json(rows);
      }); 
    }
}

