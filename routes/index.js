var express = require('express');
var router = express.Router();
var controller = require('../controllers');

/* GET home page. */
router.get('/', function(req, res, next) {
    var user = (req.session.student)?req.session.student:req.session.teacher
    res.render('index',{
        user : user
    });
});
router.get('/index', function(req, res, next) {
    var user = (req.session.student)?req.session.student:req.session.teacher
    res.render('index',{
        user : user
    });
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

module.exports = router;
