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
var path = require('path');
var fs = require('fs')
//文件夹删除
function deleteall(path) {
    var files = [];
    if(fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function(file, index) {
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteall(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

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
}).post('/', function(req, res, next) {
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

//创建一门新课
router.post('/add_course',function (req, res, next) {
    console.log('==============');
    console.log(req.body);
    Course.create({
        t_id:req.session.teacher.id,
        category:req.body.category,
        grade:req.body.grade,
        title:req.body.title,
        information:req.body.information
    }).then(function (course) {
        var baseUrl = path.join(__dirname, '../public/resource/',course.id.toString());
        if (!fs.existsSync(baseUrl)) {
            fs.mkdirSync(baseUrl);
        }
        if(course) res.json({code:200,order:'add',course:course});
        else res.json({code:404,message:'找不到该门课程'})
    })
})

//更新课程
router.post('/update',function (req, res, next) {
    console.log('==============');
    console.log(req.body);
    Course.update({
        category:req.body.category,
        grade:req.body.grade,
        title:req.body.title,
        information:req.body.information
    },{
        where:{
            id:req.query.cid
        }
    }).then(function (cnt) {
        if(cnt) res.json({code:200,order:'update',course:req.body,cid:req.query.cid});
        else res.json({code:404,message:'找不到该门课程'})
    })
})
//课程删除
router.get('/delete',function (req, res, next) {
    console.log(req.query);
    Course.destroy({
        where:{
            id:req.query.cid
        }
    }).then(function () {
        deleteall(path.join(__dirname , '../public/resource/' , req.query.cid));
        res.redirect('/information');
    })
})

module.exports = router;