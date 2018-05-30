/**
 * Created by 刘柘林 on 2018/1/26.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    var user = (req.session.student)?req.session.student:req.session.teacher;
    if(user){
        res.render('help',{
            user : user
        });
    }else {
        res.redirect('login');
    }
});

module.exports = router;