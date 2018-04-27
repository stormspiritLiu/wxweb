/**
 * Created by 刘柘林 on 2018/2/10.
 */
var express = require('express');
var router =  express.Router();
var Teacher = require('../models').Teacher;
var Student = require('../models').Student;
var async = require('async');

router.get('/', function(req, res, next) {
    async.waterfall([
        function(callback){
            Teacher.findByTwo("全部","全部").then(function (teachers) {

                callback(null, teachers);
            })
        }
    ], function (err, teachers,t_cnt) {
        var user = (req.session.student)?req.session.student:req.session.teacher
        res.render('teacher/select_teacher',{
            teachers:teachers.sort(function (a,b) {
                return (a.id < b.id)
            }),
            user : user
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
        }
    ], function (err, teachers,t_cnt) {
        res.json({
            teachers:teachers.sort(function (a,b) {
                return (a.id < b.id)
            }),
        })
    });
})

router.post('/authorize', function (req, res, next) {
    console.log(req.body)
    Student.update({
        state: 1,
        access_type : 1,
        access_id : req.session.teacher.id
    },{
        where : {id : req.body.id}
    }).then(function (value) {
        if(value == 1){
            Teacher.update({
                access_num : req.body.num - 1
            },{
                where : {id : req.session.teacher.id}
            }).then(function () {
                res.json({
                    id : req.body.id
                })
            })
        }else{
            res.end()
        }
    })
})
module.exports = router;