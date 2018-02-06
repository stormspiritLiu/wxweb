/**
 * Created by 刘柘林 on 2018/1/26.
 */
var express = require('express');
var router = express.Router();
var Teacher = require('../models').Teacher;
var Student = require('../models').Student;

router.get('/', function (req, res, next) {
    if(req.session.admin){
        res.render('admin/admin_layout');
    }else {
        res.redirect('login');
    }
});

//学生信息审核
router.get('/student', function (req, res, next) {
    Student.findAll().then(function (students) {
        students.sort(function (a,b) {
            return (a.state > b.state);
        });

        res.render('admin/student_info',{
            students:students
        })
    })
}).post('/student',function (req, res, nexr) {
    console.log("+++++++++");
    console.log(req.body);
    Student.update({
        state: req.body.state
    },{
        where : {account:req.body.account}
    })
    Student.findByAccount(req.body.account).then(function (stu) {
        res.json({
            id : stu.id
        });
    })

});

//教师信息审核
router.get('/teacher', function (req, res, next) {
    Teacher.findAll().then(function (teachers) {
        teachers.sort(function (a,b) {
            return (a.state > b.state);
        });

        res.render('admin/teacher_info',{
            teachers:teachers
        })
    })
}).post('/teacher',function (req, res, nexr) {
    console.log("---------");
    console.log(req.body);
    Teacher.update({
        state: req.body.state
    },{
        where : {account:req.body.account}
    })

    Teacher.findByAccount(req.body.account).then(function (tea) {
        res.json({
            id : tea.id
        });
    })
});;

module.exports = router;