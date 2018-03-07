/**
 * Created by 刘柘林 on 2018/2/28.
 */
var express = require('express');
var router =  express.Router();
var Teacher = require('../models').Teacher;
var Student = require('../models').Student;
var Course = require('../models').Course;
var async = require('async');
var utils = require('../utils');
var fs = require('fs');
var path = require('path');

function teacher_detail(tid,req,res) {
    async.waterfall([
        function (callback) {
            Teacher.findById(tid).then(function (teacher) {
                callback(null,teacher)
            })
        },
        function (teacher, callback) {
            Course.findAll({
                where: {
                    t_id : teacher.id
                }
            }).then(function (courses) {
                callback(null,teacher,courses)
            })
        },
    ],function (err, teacher,courses) {
        var user = (req.session.student)?req.session.student:req.session.teacher
        res.render('teacher/information',{
            teacher : teacher,
            courses : courses,
            user : user
        })
    })
}

router.get('/', function(req, res, next) {
    if(req.session.student){
        res.send('待施工')
    } else if(req.session.teacher){
        teacher_detail(req.session.teacher.id,req,res)
    } else{
        res.redirect('/login');
    }
});

//用户登出
router.get('/logout',function (req, res, next) {
    console.log('==============');
    if(req.session.student){
        delete req.session.student
        res.redirect('/');
    }else{
        delete req.session.teacher
        res.redirect('/')
    }
})

//用户查看老师信息页面
router.get('/detail',function (req,res,next) {
    teacher_detail(req.query.tid,req,res)
})


module.exports = router;