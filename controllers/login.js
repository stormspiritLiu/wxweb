/**
 * Created by 刘柘林 on 2018/1/26.
 */
var express = require('express');
var router =  express.Router();
var Admin = require('../models').Admin;
var Teacher = require('../models').Teacher;
var Student = require('../models').Student;
var async = require('async');
var utils = require('../utils');

router.get('/', function(req, res, next) {
    res.render('login');
}).post('/', function (req, res, next) {
    var form = {
        account: req.body.account,
        password: req.body.password
    };
    console.log("+++++++++");
    console.log(form);
    async.waterfall([
        function (callback) {
            Admin.findByAccount(form.account).then(function (admin) {
                if(!admin){
                    callback(null);
                }else if(form.password != admin.password){
                    callback("密码不正确");
                }else{
                    //管理员登录成功，保存session
                    utils.adminLoginSession(req,res,admin);
                    res.redirect('/admin');
                }
            })
        },
        function (callback) {
            Teacher.findByAccount(form.account).then(function (teacher) {
                if(!teacher){
                    callback(null);
                }else if(form.password != teacher.password){
                    res.send("密码不正确");
                }else if(teacher.state==0){
                    res.send("用户正在审核");
                }else{
                    //登录成功
                    utils.teacherLoginSession(req,res,teacher);
                    res.redirect('/');
                }
            })
        },
        function (callback) {
            Student.findByAccount(form.account).then(function (student) {
                if(!student){
                    callback("用户不存在");
                }else if(form.password != student.password){
                    callback("密码不正确");
                }else if(student.state==0){
                    res.send("用户正在审核");
                } else{
                    //登录成功
                    utils.studentLoginSession(req,res,student);
                    res.redirect('/');
                }
            })
        }
    ],function (err) {
        console.log(err);
        res.send(err);
    })
    // Admin.findByAccount(form.account).then(function (admin) {
    //     if(!admin){
    //         Teacher.findByAccount(form.account).then(function (teacher) {
    //            if(!teacher){
    //                Student.findByAccount(form.account).then(function (student) {
    //                    if(!student){
    //                        res.render('message', {message:"用户不存在"});
    //                    }else if(form.password != student.password){
    //                        res.render('message', {message:"密码不正确"});
    //                    }else{
    //                        res.render('message', {message:"登录成功"});
    //                    }
    //                })
    //            }else if(form.password != teacher.password){
    //                res.render('message', {message:"密码不正确"});
    //            }else{
    //                res.render('message', {message:"登录成功"});
    //            }
    //         });
    //     }
    //     else if(form.password != admin.password){
    //         res.render('message', {message:"密码不正确"});
    //     }else {
    //         res.render('message', {message:"登录成功"});
    //     }
    // })
});
module.exports = router;