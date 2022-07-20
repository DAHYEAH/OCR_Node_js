var express = require('express');
var router = express.Router();

/* mysql */
var mysql = require('../config/mysql/db');

// controllers로 옮긴다.
var stat = require('../controllers/statistic')

/* GET users listing. */
router.get('/',stat.inputcolumn);
router.post('/result',stat.statistic)
module.exports = router;
