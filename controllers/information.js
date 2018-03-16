/**
 * Created by 刘柘林 on 2018/2/28.
 */
var express = require('express');
var router =  express.Router();
var Teacher = require('../models').Teacher;
var Student = require('../models').Student;
var Course = require('../models').Course;
var Course_Student = require('../models').Course_Student;
var Teacher_Remark = require('../models').Teacher_Remark;
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
        function (teacher,courses, callback) {
            Teacher_Remark.findByTId(teacher.id).then(function (remarks) {
                callback(null,teacher,courses,remarks)
            })
        },
    ],function (err, teacher,courses,remarks) {
        var user = (req.session.student)?req.session.student:req.session.teacher
        res.render('teacher/information',{
            teacher : teacher,
            courses : courses,
            remarks : remarks,
            user : user
        })
    })
}

//老师与学生的信息页面展示
router.get('/', function(req, res, next) {
    if(req.session.student){
        async.waterfall([
            function (callback) {
                Student.findById(req.session.student.id).then(function (student) {
                    callback(null,student)
                })
            },
            function (student, callback) {
                Course_Student.findBySId(req.session.student.id).then(function (c_s) {
                    callback(null,student,c_s)
                })
            },
            function (student, c_s, callback) {
                var t_name = [];
                var courses = [];
                var count = 0;
                if(c_s.length > 0)
                    c_s.forEach(function (item) {
                        console.log(item.dataValues)
                        Course.findById(item.c_id).then(function (course) {
                            courses.push(course);
                            Teacher.findById(course.t_id).then(function (teacher) {
                                count++;
                                t_name.push(teacher.name);
                                if(count == courses.length){
                                    callback(null,student,courses,t_name)
                                }
                            })
                        })
                    })
                else
                    callback(null,student,courses,t_name)
            }
        ],function (err, student,courses,t_name) {
            console.log(t_name)
            var user = (req.session.student)?req.session.student:req.session.teacher
            res.render('student/information',{
                student : student,
                courses : courses,
                t_name : t_name,
                user : user
            })
        })
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

//学生编辑个人信息
router.post('/update_info_stu',function (req, res, next) {
    console.log(req.body);
    Student.update({
        name : req.body.name,
        school : req.body.school,
        grade : req.body.grade,
        information : req.body.information==''?'什么都没写':req.body.information
    },{
        where:{
            id : req.session.student.id
        }
    }).then(function () {
        res.json({
            name : req.body.name,
            school : req.body.school,
            grade : req.body.grade,
            information : req.body.information==''?'什么都没写':req.body.information
        })
    })
})

//学生修改密码
router.post('/update_password_stu',function (req, res, next) {
    console.log(req.body);
    if(req.body.new_password == req.body.confirm_password){
        Student.count({
            where:{
                id : req.session.student.id,
                password : req.body.old_password
            }
        }).then(function (cnt) {
            if(cnt == 1){
                Student.update({
                    password : req.body.new_password
                },{
                    where:{
                        id: req.session.student.id
                    }
                })
                res.json({type : 1})
            }else{
                res.json({type : 2})
            }
        })
    }else{
        res.json({type : 3})
    }


})

//教师编辑个人信息
router.post('/update_info_tea',function (req, res, next) {
    console.log(req.body);
    Teacher.update({
        name : req.body.name,
        teaching_age : req.body.teaching_age,
        information : req.body.information==''?'什么都没写':req.body.information,
        grade : req.body.grade,
        category : req.body.category
    },{
        where:{
            id : req.session.teacher.id
        }
    }).then(function () {
        res.json({
            name : req.body.name,
            teaching_age : req.body.teaching_age,
            information : req.body.information==''?'什么都没写':req.body.information,
            grade : req.body.grade,
            category : req.body.category
        })
    })
})

//教师修改密码
router.post('/update_password_tea',function (req, res, next) {
    console.log(req.body);
    if(req.body.new_password == req.body.confirm_password){
        Teacher.count({
            where:{
                id : req.session.teacher.id,
                password : req.body.old_password
            }
        }).then(function (cnt) {
            if(cnt == 1){
                Teacher.update({
                    password : req.body.new_password
                },{
                    where:{
                        id: req.session.teacher.id
                    }
                })
                res.json({type : 1})
            }else{
                res.json({type : 2})
            }
        })
    }else{
        res.json({type : 3})
    }


})

module.exports = router;