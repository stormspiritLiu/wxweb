/**
 * Created by 刘柘林 on 2018/2/6.
 */
var express = require('express');
var router =  express.Router();
var Course = require('../models').Course;
var Teacher = require('../models').Teacher;
var Course_Remark = require('../models').Course_Remark;
var Resource = require('../models').Resource;
var async = require('async');

//寻找课程以及查询课程
router.get('/', function(req, res, next) {
    async.waterfall([
        function(callback){
            Course.findByTwo("全部","全部").then(function (courses) {
                callback(null, courses);
            })
        },
        function(courses, callback){
            var count = 0;
            var t_name = [];
            courses.forEach(function (item) {
                Teacher.findById(item.dataValues.t_id).then(function (teacher) {
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
        var user = (req.session.student)?req.session.student:req.session.teacher
        res.render('course/select_course',{
            courses:courses,
            t_name:t_name,
            user : user
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
                var t_name = [];
                courses.forEach(function (item) {
                    Teacher.findById(item.dataValues.t_id).then(function (teacher) {
                        t_name.push(teacher.name);
                        console.log(count);console.log(t_name);
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
        // console.log(t_name);
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

//课程详细页面
router.get('/detail',function (req, res, next) {
    var cid = parseInt(req.query.cid);
    // console.log(cid);
    async.waterfall([
        function (callback) {
            Course.findById(cid).then(function (course) {
                callback(null,course)
            })
        },
        function (course, callback) {
            Course_Remark.findByCId(cid).then(function (remarks) {
                callback(null,course,remarks);
            })
        },
        function (course,remarks,callback) {
            Resource.findByCId(cid).then(function (resources) {
                callback(null,course,remarks,resources);
            })
        },
        function (course,remarks,resources,callback) {
            Teacher.findById(course.t_id).then(function (teacher) {
                callback(null,course,remarks,resources,teacher);
            })
        }
    ],function (err, course,remarks,resources,teacher) {
        var user = (req.session.student)?req.session.student:req.session.teacher
        res.render('course/detail',{
            course : course,
            remarks : remarks,
            resources: resources,
            tea : teacher,
            user : user
        })
    })
});
module.exports = router;