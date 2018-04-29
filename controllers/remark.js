/**
 * Created by 刘柘林 on 2018/3/7.
 */
var express = require('express');
var router =  express.Router();
var Course = require('../models').Course;
var Teacher = require('../models').Teacher;
var Teacher_Remark = require('../models').Teacher_Remark;
var Course_Student = require('../models').Course_Student;

function calc_mark(v,m,r,c) {
    // R代表该课程（老师）的算术平均分，
    // v代表评价课程（老师）的人数，
    // m为进入前10名的最小评分人数，默认为20
    // C代表目前所有课程（老师）的算术平均分数，默认为4.5。
    console.log("v = " +v);
    console.log("m = " +m);
    console.log("r = " +r);
    console.log("c = " +c);

    console.log(v/(v+m) * r + m/(v+m) * c);
    return v/(v+m) * r + m/(v+m) * c;
}


router.post('/teacher', function(req, res, next) {
    Teacher_Remark.findOne({
        where : {
            s_id: req.session.student.id,
            t_id: req.query.tid
        }
    }).then(function (old_remark) {
        if(old_remark){
            //修改之前的评论
            console.log("修改之前的评论")
            Teacher.findById(req.query.tid).then(function (teacher) {
                var v = teacher.mark_p_num;
                var R = (teacher.mark_arith*teacher.mark_p_num + parseInt(req.body.mark) - old_remark.mark) / v;
                Teacher.update({
                    mark_arith : R,
                    mark : calc_mark(v,20,R,4.5)
                },{
                    where:{
                        id : req.query.tid
                    }
                }).then(function () {
                    Teacher_Remark.update({
                        mark: req.body.mark,
                        information: req.body.information
                    },{
                        where:{
                            s_id: req.session.student.id,
                            t_id: req.query.tid,
                        }
                    }).then(function (remark) {
                        console.log(remark);
                        res.json({
                            remark: remark
                        })
                    })
                })
            })
        }
        else{
            //一条船新的评论
            console.log("一条船新的评论")
            Teacher.findById(req.query.tid).then(function (teacher) {
                var v = teacher.mark_p_num+1
                var R = (teacher.mark_arith*teacher.mark_p_num + parseInt(req.body.mark)) / v;
                Teacher.update({
                    mark_arith : R,
                    mark_p_num : v,
                    mark : calc_mark(v,20,R,4.5)
                },{
                    where:{
                        id : req.query.tid
                    }
                }).then(function () {
                    Teacher_Remark.create({
                        s_id: req.session.student.id,
                        t_id: req.query.tid,
                        mark: req.body.mark,
                        information: req.body.information
                    }).then(function (remark) {
                        console.log(remark);
                        res.json({
                            remark: remark
                        })
                    })
                })
            })
        }
    })




});

router.post('/course', function(req, res, next) {
    Course_Student.findOne({
        where : {
            s_id: req.session.student.id,
            c_id: req.query.cid,
            mark: [1,2,3,4,5]
        }
    }).then(function (old_remark) {
        Course_Student.update({
            mark: req.body.mark,
            information: req.body.information
        },{
            where:{
                s_id: req.session.student.id,
                c_id: req.query.cid,
            }
        }).then(function (remark) {
            if(old_remark){
                //修改之前的评论
                console.log("修改之前的评论")
                Course.findById(req.query.cid).then(function (course) {
                    var v = course.mark_p_num;
                    var R = (course.mark_arith*course.mark_p_num + parseInt(req.body.mark ) - old_remark.mark) / v;
                    Course.update({
                        mark_arith : R,
                        mark : calc_mark(v,20,R,4.5)
                    },{
                        where:{
                            id : req.query.cid
                        }
                    })
                })
            }
            else{
                //一条船新的评论
                console.log("一条船新的评论")
                Course.findById(req.query.cid).then(function (course) {
                    var v = course.mark_p_num+1
                    var R = (course.mark_arith*course.mark_p_num + parseInt(req.body.mark)) / v;
                    Course.update({
                        mark_arith : R,
                        mark_p_num : v,
                        mark : calc_mark(v,20,R,4.5)
                    },{
                        where:{
                            id : req.query.cid
                        }
                    })
                })
            }
            res.json({
                remark: remark
            })
        })

    })


});
module.exports = router;