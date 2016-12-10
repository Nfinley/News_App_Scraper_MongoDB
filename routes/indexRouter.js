'use strict';

const express = require('express'),
    indexController = require('../controllers/indexController'),
    router = express.Router();

/* GET home page. */
router.get('/', indexController.loadIndex);



module.exports = router;
