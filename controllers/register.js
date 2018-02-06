/**
 * Created by 刘柘林 on 2018/1/27.
 */
var express = require('express');
var router =  express.Router();
var Teacher = require('../models').Teacher;
var Student = require('../models').Student;

router.get('/', function(req, res, next) {
    res.render('register');
});

router.post('/student',function (req,res,next) {
    console.log(req.body);
    var form = req.body;
    Student.findByAccount(form.account).then(function (student) {
        if(student){
            res.send("用户名已存在");
        }else{
            Student.create(form).then(function (stu) {
                if(stu) res.send("成功");
                else res.send("失败");
            })
        }
    })
})
router.post('/teacher',function (req,res,next) {
    console.log(req.body);
    var form = req.body;
    Teacher.findByAccount(form.account).then(function (teacher) {
        if(teacher){
            res.send("用户名已存在");
        }else{
            Teacher.create(form).then(function (tea) {
                if(tea) res.send("成功");
                else res.send("失败");
            })
        }
    })
})
module.exports = router;