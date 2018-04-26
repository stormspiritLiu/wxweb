/**
 * Created by 刘柘林 on 2018/4/26.
 */
var express = require('express');
var router =  express.Router();
var path = require('path');
var Course_Outline = require('../models').Course_Outline;

router.get('/', function(req, res, next) {
    if(req.session.student || req.session.teacher || req.session.admin){
        Course_Outline.findOne({
            where:{
                id : req.query.vid
            }
        }).then(function (video) {
            var file = path.join('/resource/',req.query.cid,'/',video.f_name);
            var user = (req.session.student)?req.session.student:req.session.teacher;
            console.log(file)
            res.render('jwplayer',{
                file: file,
                user : user
            })
        })
    }else{
        res.redirect('/login');
    }

});

module.exports = router;