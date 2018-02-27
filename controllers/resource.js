/**
 * Created by 刘柘林 on 2018/2/27.
 */
var express = require('express');
var router =  express.Router();
var fs = require('fs');
var path = require('path');

router.get('/', function(req, res, next) {
    var fpath = path.join(__dirname, '../public/resource/1.txt')
    res.download(fpath)
});

module.exports = router;