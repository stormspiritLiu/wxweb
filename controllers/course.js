/**
 * Created by 刘柘林 on 2018/2/6.
 */
var express = require('express');
var router =  express.Router();
var Course = require('../models').Course;
var Teacher = require('../models').Teacher;
var async = require('async');

router.get('/', function(req, res, next) {
    async.waterfall([
        function(callback){
            Course.findByTwo("全部","全部").then(function (courses) {
                callback(null, courses);
            })
        },
        function(courses, callback){
            var count = 0;
            courses.forEach(function (item) {
                var t_name = [];
                Teacher.findById(item.dataValues.id).then(function (teacher) {
                    t_name.push(teacher.name)
                }).then(function () {
                    count++;
                    if(count == courses.length){
                        callback(null,courses,t_name);
                    }
                })
            })
        },
    ], function (err, courses,t_name) {
        res.render('course/select_course',{
            courses:courses,
            t_name:t_name
        })
    });
});

router.post('/', function(req, res, next) {
    console.log(req.body);

    async.waterfall([
        function(callback){
            Course.findByTwo(req.body.category,req.body.grade).then(function (courses) {
                callback(null, courses);
            })
        },
        function(courses, callback){
            var count = 0;
            if(courses.length == 0){
                callback(null,[],[])
            }else{
                courses.forEach(function (item) {
                    var t_name = [];
                    Teacher.findById(item.dataValues.id).then(function (teacher) {
                        t_name.push(teacher.name)
                    }).then(function () {
                        count++;
                        if(count == courses.length){
                            callback(null,courses,t_name);
                        }
                    })
                })
            }
        },
    ], function (err, courses,t_name) {
        console.log(t_name);
        res.json({
            courses:courses,
            t_name:t_name
        })
    });

    // Course.findByTwo(req.body.category,req.body.grade).then(function (courses) {
    //     var ret = [];
    //     courses.forEach(function (item) {
    //         Teacher.findById(item.dataValues.id).then(function (teacher) {
    //             return teacher.name;
    //         }).then(function (t_name) {
    //             ret.push({
    //                 // course : item.dataValues,
    //                 t_name : t_name
    //             })
    //         })
    //     })
    //     console.log(ret);
    //     res.json({
    //         ret : ret
    //     })
    // })
});

module.exports = router;