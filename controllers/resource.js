/**
 * Created by 刘柘林 on 2018/2/27.
 */
var express = require('express');
var router =  express.Router();
var fs = require('fs');
var path = require('path');
var Resource = require('../models').Resource;
var Course_Outline = require('../models').Course_Outline;
var multer = require('multer')

// 控制文件的存储
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/resource/',req.query.cid));    // 保存的路径
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// 通过 storage 选项来对 上传行为 进行定制化
var upload = multer({ storage: storage })

//课件上传
router.post('/upload', upload.single('myfile'),function(req, res, next) {
    console.log("-----上传课件-----");
    console.log(req.file);
    Resource.findOne({
        where: {
            c_id : req.query.cid,
            name : req.file.originalname
        }
    }).then(function (resource) {
        //有相同文件名课件
        if(resource){
            Resource.update({
                create_time : new Date()
            },{
                where: {
                    c_id : req.query.cid,
                    name : req.file.originalname
                }
            }).then(function () {
                console.log("----更新完成-------")
                res.status(200).send({
                    type : 2,
                    id : resource.id,
                    name : resource.name
                });
            })
        }else{
            Resource.create({
                c_id : req.query.cid,
                name : req.file.originalname
            }).then(function (resource) {
                console.log("----上传完成-------")
                // res.redirect('/course/detail?cid='+ req.query.cid+'#resource');
                res.status(200).send({
                    type : 1,
                    id : resource.id,
                    name : resource.name
                })
            })

        }
    })
});

//课件下载
router.get('/', function(req, res, next) {
    if(req.session.student || req.session.teacher || req.session.admin){
        var cid = req.query.cid, fname = req.query.name;
        var fpath = path.join(__dirname, '../public/resource/',cid,'/',fname)
        console.log(fpath)
        res.download(fpath)
    }else{
        res.redirect('/login')
    }
});

//课件或视频删除
router.post('/delete', function(req, res, next) {
    console.log("-----删除课件/视频-----");
    console.log(req.body);
    var cid = req.body.cid, fname = req.body.name;
    var fpath = path.join(__dirname, '../public/resource/',cid,'/',fname);
    console.log(fpath)
    fs.unlink(fpath, function(err) {
        if (err) {
            //出错返回错误信息
            res.json({
                err : err
            })
            return console.error(err);
        }
        if(req.query.type == 1){
            //视频删除
            Course_Outline.destroy({where:{id : req.body.id}}).then(function () {
                res.json({
                    ret : null
                })
            })
        }
        else if(req.query.type == 2){
            //课件删除
            Resource.destroy({where:{id : req.body.id}}).then(function () {
                res.json({
                    ret : null
                })
            })
        }

    });
});

//视频上传
router.post('/video', upload.single('video'),function(req, res, next) {
    console.log("-----上传视频-----");
    console.log(req.file);
    Course_Outline.findOne({
        where: {
            c_id : req.query.cid,
            f_name : req.file.originalname
        }
    }).then(function (video) {
        //有相同文件名视频,数据库不需要改动
        if(video){
            res.status(200).send({
                type : 2,
                id : video.id,
                f_name : video.f_name
            });
        }else{
            Course_Outline.create({
                c_id : req.query.cid,
                f_name : req.file.originalname,
                title : req.file.originalname
            }).then(function (video) {
                console.log("----上传完成-------")
                // res.redirect('/course/detail?cid='+ req.query.cid+'#resource');
                res.status(200).send({
                    type : 1,
                    id : video.id,
                    f_name : video.f_name
                })
            })

        }
    })
});


module.exports = router;