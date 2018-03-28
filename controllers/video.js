/**
 * Created by 刘柘林 on 2018/3/16.
 */
var express = require('express');
var router =  express.Router();
var path = require('path');
var Course_Outline = require('../models').Course_Outline;
var fs = require('fs');

router.get('/', function(req, res, next) {
    if(req.session.student || req.session.teacher || req.session.admin){
        Course_Outline.findOne({
            where:{
                id : req.query.vid
            }
        }).then(function (video) {
            var src = path.join('/resource/',req.query.cid,'/',video.f_name);
            console.log(src)
            res.render('video',{
                src: src
            })
            // res.writeHead(200, {'Content-Type': 'video/mp4'});
            // var rs = fs.createReadStream(src);
            //
            // rs.pipe(res);
            //
            // rs.on('end',function(){
            //     res.end();
            //     console.log('end call');
            // });
        })
    }else{
        res.redirect('/login');
    }

});

module.exports = router;