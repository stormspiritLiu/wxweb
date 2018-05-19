/**
 * Created by 刘柘林 on 2018/3/16.
 */

//仅做测试用，此为废弃路由
// var express = require('express');
// var router =  express.Router();
// var path = require('path');
// var Course_Outline = require('../models').Course_Outline;
// var fs = require('fs');
//
// router.get('/', function(req, res, next) {
//     if(req.session.student || req.session.teacher || req.session.admin){
//         Course_Outline.findOne({
//             where:{
//                 id : req.query.vid
//             }
//         }).then(function (video) {
//             var src = path.join('/resource/',req.query.cid,'/',video.f_name);
//             var user = (req.session.student)?req.session.student:req.session.teacher;
//             console.log(src)
//             res.render('video',{
//                 src: src,
//                 user : user
//             })
//             // res.writeHead(200, {'Content-Type': 'video/mp4'});
//             // var rs = fs.createReadStream(src);
//             //
//             // rs.pipe(res);
//             //
//             // rs.on('end',function(){
//             //     res.end();
//             //     console.log('end call');
//             // });
//         })
//     }else{
//         res.redirect('/login');
//     }
//
// });

// module.exports = router;