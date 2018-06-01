/**
 * Created by 刘柘林 on 2018/4/29.
 */
var express = require('express');
var router =  express.Router();
var Live = require('../models').Live;
var Teacher = require('../models').Teacher;
var path = require('path');
var async = require('async');

//直播结束修改state
router.get('/end', function (req, res) {
    // res.status(500)
    console.log(req.query)
    Live.findById(req.query.lid)
        .then(function (live) {
            if(live){
                Live.update({
                    state : 3
                },{where:{id:req.query.lid}}).then(function () {
                    res.redirect('/information');
                })
            }else {
                //未找到或者密码不正确
                res.status(500);
            }

    })

});

//直播删除
router.get('/delete', function (req, res) {
    // res.status(500)
    console.log(req.query)
    Live.findById(req.query.lid)
        .then(function (live) {
            if(live){
                Live.destroy({where:{id:req.query.lid}}).then(function () {
                    res.redirect('/information');
                })
            }else {
                //未找到或者密码不正确
                res.status(500);
            }

        })

});

//开始推流触发函数
router.get('/push', function (req, res) {
    // res.status(500)
    console.log(req.query.name +" "+ req.query.psw)
    Live.findOne({
        where:{
            id : req.query.name,
            password : req.query.psw
        }
    }).then(function (live) {
        if(live){
            Live.update({
                state : 2
            },{where:{id:req.query.name}}).then(function () {
                res.send('passed');
            })
        }else {
            //未找到或者密码不正确
            res.status(500);
        }

    })

});
//结束推流触发函数
router.get('/push_done', function(req, res){
    console.log('ok push done: ' + JSON.stringify(req.query));

    Live.findOne({
        where:{
            id : req.query.name,
        }
    }).then(function (live) {
        if(live){
            Live.update({
                state : 1 //未开始
            },{where:{id:req.query.name}}).then(function () {
                res.send('passed');
            })
        }else {
            //未找到或者密码不正确
            res.status(500);
        }

    })
});

router.get('/:lid?', function(req, res, next) {
    if(req.originalUrl == '/live'){
        //直播房间选择页面
        async.waterfall([
            function (callback) {
                Live.findAll().then(function (lives) {
                    callback(null,lives.reverse())
                })
            },
            function (lives,callback) {
                var count = 0;
                var t_name = [];
                lives.forEach(function (item) {
                    Teacher.findById(item.dataValues.t_id).then(function (teacher) {
                        t_name.push(teacher.name)
                    }).then(function () {
                        count++;
                        if(count == lives.length){
                            callback(null,lives,t_name);
                        }
                    })
                })
            }
        ],function (err, lives,t_name) {
            var user = (req.session.student)?req.session.student:req.session.teacher;
            res.render('live/select_live',{
                lives: lives,
                t_name:t_name,
                user : user
            })
        })
    }
    else{
        //处理不同直播房间路由
        if(req.session.student || req.session.teacher || req.session.admin) {
            var lid = req.params.lid;
            console.log("router.get('/:lid', function(req, res)+++++" + lid)
            Live.findById(lid).then(function (live) {
                if (!live) {
                    res.send("该直播间不存在")
                }
                else {
                    if (live.state == 1) {
                        //未开始
                        res.send("直播尚未开始或者推流意外中断")
                    } else if (live.state == 2) {
                        //正在进行
                        var file = "rtmp://localhost/live/" + lid
                        var user = (req.session.student) ? req.session.student : req.session.teacher;
                        console.log("2222" + file)
                        res.render('on_play', {
                            file: file,
                            user: user
                        })
                    } else {
                        //已结束
                        var file = '/' + path.join('/live_record/',lid) + '.flv';
                        var user = (req.session.student) ? req.session.student : req.session.teacher;
                        console.log("3333" + file)
                        res.render('on_play', {
                            file: file,
                            user: user
                        })
                    }
                }

            })
        }else{
            res.redirect('/login');
        }
    }
});

module.exports = router;