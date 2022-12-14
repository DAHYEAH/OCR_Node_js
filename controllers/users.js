/* mybatis $ npm i mybatis-mapper */
const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['./models/mybatis/users/userMapper.xml'])
var format = {language: 'sql', indent: ' '}

/* mybatis query */
const crypto = require('crypto');

/* mysql */
var mysql = require('../config/mysql/db');
var mysql2 = require('../config/mysql/db2');
// const { router } = require('../app');

module.exports={
    userspage : function(req, res, next) {
        res.send('this is users page')
    },
    signuppage : function(req,res,next){
        res.render('signup')
    },
    insertUserQuery: function(req, res, next){
        var body = req.body;    
        var Fullname = body.Fullname;
        var Userid = body.Userid;
        var Email = body.Email;
        var inputPassword = body.Password;
        // var inputPassword = body.Password;
        console.log(Fullname,Userid,Email,inputPassword);
        var salt = 10;
        // var salt = Math.round((new Date().valueOf() * Math.random())) + "";
        let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");
        var Password = hashPassword;
        
        console.log(Password)
      
        // var param = {
        //   Fullname : body.Fullname,
        //   Userid : body.Userid,
        //   Email : body.Email,
        //   Password : hashPassword,
        // //   // userName : body.userName?body.userName:null,
        // //   // authType : body.authType?body.authType:'y',
        //   salt : salt,
        // }
        const params = [req.body.Fullname, req.body.Userid, req.body.Email, Password];
        // console.log(hashPassword)
      
        // mysql.query('select * from sign_up where Userid=?', [Userid],(err,data)=>{
        //   if(data.length == 0){
        //     console.log("회원가입성공");
        //     mysql.query('insert into sign_up (Fullname, Userid, Email, Password) values (?,?,?,?)',[Fullname,Userid,Email,hashPassword]);
        //     res.send("success")
        //   }else{
        //     res.send("fail")
        //   }
        // });
        // var query = mybatisMapper.getStatement('userMapper', 'insertUserQuery', params, format)
        mysql.query("INSERT INTO sign_up VALUES (?,?,?,?)" , params, (error, rows) => {
          res.json(rows)
        })

    },
    loginpage: function(req,res,next){
        res.render('login')
    },
    findUserQuery : async function(req, res, next){
        let body = req.body;
        var param = {
          Userid : body.Userid,
        }
        var query = mybatisMapper.getStatement('userMapper', 'findUserQuery', param, format)
        let [result, fields] = await mysql2.query(query)
        let dbPassword = result[0].Password;
        var inputPassword = body.Password;
        // let salt = result[0].salt;
        var salt = 10;
        let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

        if(dbPassword === hashPassword){
          console.log("-------------success login");
          req.session.Userid = body.Userid;
          req.session.is_logined = true;
          res.send('success login');
        } else {
          console.log("-------------fail login");
          res.send('fail login')
        }
        
    },
    logoutpage : function(req, res, next){
        try{
            req.session.destroy()
            console.log('destroy success')
        }// 내부 sessions 폴터 캐쉬 삭제
        catch(err){
            console.log('destroy error')
        }
        res.clearCookie('sid')
        res.send('logout')
    },
    checkpage : function(req,res,next){
        if(req.session.is_logined){
            return res.json({message: 'user 있다'});
          }else{
            return res.json({message: 'user 없음'});
        }
    }
}
