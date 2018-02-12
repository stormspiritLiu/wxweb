/**
 * Created by 刘柘林 on 2018/2/10.
 */
var express = require('express');
var router =  express.Router();
var Teacher = require('../models').Teacher;
var Course = require('../models').Course;
var async = require('async');

router.get('/', function(req, res, next) {
    async.waterfall([
        function(callback){
            Teacher.findByTwo("全部","全部").then(function (teachers) {

                callback(null, teachers);
            })
        },
        function(teachers, callback){
            var count = 0;
            var t_cnt = [];
            teachers.forEach(function (item) {
                console.log(item.dataValues)
                Course.count({
                    where:{
                        t_id : item.id
                    }
                }).then(function (cnt) {
                    count++;
                    t_cnt.push(cnt);
                    if(count == teachers.length){
                        callback(null,teachers,t_cnt)
                    }
                })
            })

        },
    ], function (err, teachers,t_cnt) {
        res.render('teacher/select_teacher',{
            teachers:teachers,
            t_cnt : t_cnt
        })
    });
});

router.post('/select',function (req, res, next) {
    console.log(req.body);
    async.waterfall([
        function(callback){
            Teacher.findByTwo(req.body.category,req.body.grade).then(function (teachers) {
                callback(null, teachers);
            })
        },
        function(teachers, callback){
            if(teachers.length == 0){
                callback(null,[],[])
            }
            else{
                var count = 0;
                var t_cnt = [];
                teachers.forEach(function (item) {
                    console.log(item.dataValues)
                    Course.count({
                        where:{
                            t_id : item.id
                        }
                    }).then(function (cnt) {
                        count++;
                        t_cnt.push(cnt);
                        if(count == teachers.length){
                            callback(null,teachers,t_cnt)
                        }
                    })
                })
            }
        },
    ], function (err, teachers,t_cnt) {
        res.json({
            teachers:teachers,
            t_cnt : t_cnt
        })
    });
})

module.exports = router;