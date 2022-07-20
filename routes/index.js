var express = require('express');
var router = express.Router();

/* mysql */
const mysql = require('../config/mysql/db');

// controllers로 옮긴다.
var index = require('../controllers/index')

router.get('/', index.getAllUser);
// router.get('/:id',index.getIdUser);

module.exports = router;
