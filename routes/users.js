var express = require('express');
var router = express.Router();

/* mysql */
var mysql = require('../config/mysql/db');
var mysql2 = require('../config/mysql/db2');

// controllers로 옮긴다.
var users = require('../controllers/users')

/* GET users listing. */
router.get('/',users.userspage);
router.get('/signup',users.signuppage);
router.post('/signup_result', users.insertUserQuery);
router.get('/login',users.loginpage);
router.post('/login_result', users.findUserQuery);
router.get("/logout", users.logoutpage);
router.get('/check', users.checkpage);

module.exports = router;
