/**
 * Created by 刘柘林 on 2018/2/6.
 */
var express = require('express');
var router =  express.Router();

router.get('/', function(req, res, next) {
    res.render('layout');
});

module.exports = router;