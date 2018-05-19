var express = require('express');
var router = express.Router();
var controller = require('../controllers');
var Teacher = require('../models').Teacher;
var Course = require('../models').Course;
var async = require('async');

function index(req,res) {
    async.waterfall([
        function (callback) {
            Course.findAll().then(function (courses) {
                var temp = courses.sort(function (a,b) {
                    return (a.mark < b.mark);
                }).slice(0,3);

                callback(null, temp)
            })
        },
        function(courses, callback) {
            var count = 0;
            var t_name = [];
            courses.forEach(function (item) {
                Teacher.findById(item.dataValues.t_id).then(function (teacher) {
                    t_name.push(teacher.name)
                }).then(function () {
                    count++;
                    if (count == courses.length) {
                        callback(null, courses, t_name);
                    }
                })
            })
        },
        function (courses,t_name, callback) {
            Teacher.findAll().then(function (teachers) {
                var temp = teachers.sort(function (a,b) {
                    return (a.mark < b.mark);
                }).slice(0,3);

                callback(null,courses,t_name, temp);
            })
        }
    ],function (err, courses,t_name,teachers) {
        var user = (req.session.student)?req.session.student:req.session.teacher
        res.render('index',{
            user : user,
            teachers : teachers,
            t_name : t_name,
            courses : courses
        });

    })

}

/* GET home page. */
router.get('/', function(req, res, next) {
    index(req,res)
});
router.get('/index', function(req, res, next) {
    index(req,res)
});

router.use('/admin', controller.admin);
router.use('/teacher', controller.teacher);
router.use('/layout', controller.layout);
router.use('/login', controller.login);
router.use('/register', controller.register);
router.use('/course', controller.course);
router.use('/resource', controller.resource);
router.use('/remark', controller.remark);
router.use('/information', controller.information);
router.use('/video', controller.jwplayer);
//router.use('/jwplayer', controller.jwplayer);
router.use('/live', controller.live);

module.exports = router;
