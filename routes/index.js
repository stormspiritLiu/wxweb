var express = require('express');
var router = express.Router();
var controller = require('../controllers');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index',{
        student: req.session.student,
        teacher: req.session.teacher
    });
});
router.get('/index', function(req, res, next) {
    res.render('index',{
        student: req.session.student,
        teacher: req.session.teacher
    });
});

router.use('/admin', controller.admin);
router.use('/teacher', controller.teacher);
router.use('/layout', controller.layout);
router.use('/login', controller.login);
router.use('/register', controller.register);
router.use('/course', controller.course);

module.exports = router;
