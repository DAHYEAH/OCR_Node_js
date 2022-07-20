var express = require('express');
var router = express.Router();

/* mysql */
var mysql = require('../config/mysql/db');

// controllers로 옮긴다.
var ocrs = require('../controllers/ocrs')

/* GET users listing. */
router.get('/',ocrs.ocrspage);
router.get('/uploadimg',ocrs.uploadimgpage);
router.post('/uploadimg_result',ocrs.uploadimg);
router.get('/uploadocr',ocrs.uploadocrpage);
router.post('/uploadocr_result',ocrs.uploadocr);

module.exports = router;