/**
 * Created by 刘柘林 on 2018/3/7.
 */
var express = require('express');
var router =  express.Router();
var Teacher_Remark = require('../models').Teacher_Remark
var Course_Remark = require('../models').Course_Remark
router.post('/teacher', function(req, res, next) {
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

});

router.post('/course', function(req, res, next) {
    Course_Remark.create({
        s_id: req.session.student.id,
        c_id: req.query.cid,
        mark: req.body.mark,
        information: req.body.information
    }).then(function (remark) {
        console.log(remark);
        res.json({
            remark: remark
        })
    })

});
module.exports = router;